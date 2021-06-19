import { useEffect, useState, } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import "firebase/firestore";
import "firebase/auth";
import { ADMIN_UID } from "./ENV_CONSTANTS";

const Chat = (props) => {

    const [firestore, setFiresStore] = useState(props.firebase.firestore());
    const [auth, setAuth] = useState(props.firebase.auth());
    const [messageInput, setMessageInput] = useState("");
    var loggedInUser = auth.currentUser;
    console.log(loggedInUser.uid);
    const firestoreCollectionRef = firestore.collection("messages");
    const receivedMessagesQuery = firestoreCollectionRef.where("to", "==", loggedInUser.uid).orderBy("timestamp", "asc").limitToLast(10);
    const [messages] = useCollectionData(receivedMessagesQuery, { idField: 'id' });

    useEffect(
        () => {
            setFiresStore(props.firebase.firestore());
            setAuth(props.firebase.auth());
        }, [props.firebase]
    );
    const sendMessage = (evt) => {
        evt.preventDefault();
        console.log('Sending message...');
        var document = {
            to: ADMIN_UID,
            from: loggedInUser.uid,
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
        <div className="chat">

            <h2>1 v 1 conversation with Bharathi</h2>
            <div>
                {messages && messages.map(
                    (messageItem) => {
                        return (<p key={messageItem.id}>{messageItem.message}</p>)
                    }
                )}
            </div>
            <div className="messageBar">
                <form onSubmit={sendMessage}>
                    <input className="messageInput" required value={messageInput} placeholder="Say Something!" onChange={(evt) => { setMessageInput(evt.target.value) }} />
                    <FontAwesomeIcon icon={faPaperPlane} className="fa-2x icon" onClick={sendMessage} />
                </form>
            </div>
        </div>
    );
}

export default Chat;