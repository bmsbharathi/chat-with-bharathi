import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import "./css/Chatroom.css";
import { DEFAULT_CHAT_DP } from "./ENV_CONSTANTS";


const Chatroom = (props) => {

    const [firestore, setFireStore] = useState(props.firebase.firestore());
    const [auth, setAuth] = useState(props.firebase.auth());
    const [messageInput, setMessageInput] = useState("");
    const loggedInUser = auth.currentUser;
    const firestoreCollectionRef = firestore.collection("chatroom");
    const chatroomMessagesQuery = firestoreCollectionRef.orderBy("timestamp", "asc").limitToLast(8);
    const [chatroomMessages] = useCollectionData(chatroomMessagesQuery, { idField: 'id' });

    useEffect(
        () => {
            setFireStore(props.firebase.firestore());
            setAuth(props.firebase.auth());
        }, [props.firebase]
    );
    const sendMessage = (evt) => {

        evt.preventDefault();
        var messageDocument = {
            message: messageInput,
            sender: loggedInUser.displayName,
            senderUid: loggedInUser.uid,
            timestamp: new Date(),
            displayPhoto: loggedInUser.photoURL
        };
        console.log("Document:::::::", messageDocument);
        firestoreCollectionRef.add(messageDocument).then(
            () => {
                console.log("successfully posted!");
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
            <h2>Chat Room</h2>
            <div className="chatroomMessages">
                {chatroomMessages && chatroomMessages.map(
                    (messageItem) => {
                        var sentTime = messageItem.timestamp.toDate().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
                        var sentDate = messageItem.timestamp.toDate().toLocaleDateString('en-GB');
                        var align = "left";
                        if (messageItem.senderUid === loggedInUser.uid) {
                            align = "right";
                        }
                        return (
                            <div className="message" key={messageItem.id}>
                                <img align={align} className="displayPicture" src={messageItem.displayPhoto ? messageItem.displayPhoto : DEFAULT_CHAT_DP} alt="displayPicture" />
                                <p align={align} className="content">
                                    {(messageItem.senderUid !== loggedInUser.uid) && <span>{messageItem.sender}:&nbsp;</span>}
                                    {messageItem.message}<br />
                                    {sentTime}<br />
                                    {sentDate}
                                </p>
                            </div>
                        )
                    }
                )}
            </div>
            <div className="messageBar">
                <form onSubmit={sendMessage}>
                    <input className="messageInput" required value={messageInput} placeholder="Say Something!" onChange={(evt) => { setMessageInput(evt.target.value) }} />
                    <FontAwesomeIcon icon={faPaperPlane} className="fa-2x icon" onClick={sendMessage} />
                </form>
            </div>
        </div >
    );
}

export default Chatroom;