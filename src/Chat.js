import { useEffect, useState, } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import "firebase/firestore";
import "firebase/auth";
import { ADMIN_UID, DEFAULT_CHAT_DP } from "./ENV_CONSTANTS";

const Chat = (props) => {

    const [firestore, setFireStore] = useState(props.firebase.firestore());
    const [auth, setAuth] = useState(props.firebase.auth());
    const [recipientUid, setRecipientUid] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const loggedInUser = auth.currentUser;
    const firestoreCollectionRef = firestore.collection("messagesDev");

    const chatMessagesQuery = firestoreCollectionRef.orderBy("timestamp", "asc").limitToLast(8);
    const [chatMessages] = useCollectionData(chatMessagesQuery, { idField: 'id' });

    useEffect(
        () => {
            console.log("UseEffect hook called!")
            setFireStore(props.firebase.firestore());
            setAuth(props.firebase.auth());
        }, [props.firebase]
    );

    const sendMessage = (evt) => {
        evt.preventDefault();
        console.log('Sending message...');
        var document = {
            to: loggedInUser.uid === ADMIN_UID ? recipientUid : ADMIN_UID,
            fromUserName: loggedInUser.displayName,
            from: loggedInUser.uid,
            displayPhoto: loggedInUser.photoURL,
            message: messageInput,
            timestamp: new Date()
        };
        firestoreCollectionRef.add(document).then(
            () => {
                console.log("successfully posted");
                setMessageInput("");
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    };


    return (
        <div className="chatroom">
            <h2>1 v 1 chat with Bharathi</h2>
            <div className="chatroomMessages">
                {chatMessages && chatMessages.filter(
                    (messageItem) => {
                        return (messageItem.from === loggedInUser.uid || messageItem.to === loggedInUser.uid);
                    }
                ).map(
                    (messageItem) => {
                        var sentTime = messageItem.timestamp.toDate().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
                        var sentDate = messageItem.timestamp.toDate().toLocaleDateString('en-GB');
                        var today = new Date().toLocaleDateString();
                        var align = "left";
                        if (messageItem.from === loggedInUser.uid) {
                            align = "right";
                        }
                        return (
                            <div className="message" key={messageItem.id}>
                                <img align={align} className="displayPicture" src={messageItem.displayPhoto ? messageItem.displayPhoto : DEFAULT_CHAT_DP} alt="displayPicture" />
                                <p align={align} className="content">
                                    {(messageItem.from !== loggedInUser.uid) && <span>{messageItem.fromUserName}:&nbsp;</span>}
                                    {messageItem.message}<br />
                                    {sentTime}<br />
                                    {today === sentDate ? "Today" : sentDate}
                                </p>
                            </div>
                        )
                    }
                )}
            </div>
            <div className="messageBar">
                <form onSubmit={sendMessage}>
                    <input className="messageInput" required value={messageInput} placeholder="Say Something!" onChange={(evt) => { setMessageInput(evt.target.value) }} />
                    <FontAwesomeIcon icon={faPaperPlane} className="fa-2x icon" onClick={sendMessage} /><br />
                    {loggedInUser.uid === ADMIN_UID && <input className="adminMessageBar" placeholder="For Admin Only!" onChange={event => setRecipientUid(event.target.value)} />}
                </form>
            </div>
        </div >
    );
}

export default Chat;