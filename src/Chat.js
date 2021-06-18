import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import "firebase/firestore";
import "firebase/auth";
import { ADMIN_UID } from "./ENV_CONSTANTS";
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Chat = (props) => {

    const [firestore, setFireStore] = useState(props.firebase.firestore());
    const [user, setUser] = useState(props.firebase.auth().currentUser);
    var [messageInput, setMessageInput] = useState("");
    const fireStoreCollectionRef = firestore.collection("messages");
    var olderMessagesQuery = fireStoreCollectionRef.where("to", "===", user.uid).orderBy("timestamp", "ASC").limitToLast(10);
    var [olderMessages] = useCollectionData(olderMessagesQuery, { idField: 'id' });

    useEffect(
        () => {
            setFireStore(props.firebase.firestore());
            setUser(props.firebase.auth().currentUser);
        }, [props.firebase,]
    );
    const sendMessage = (evt) => {

        evt.preventDefault();
        console.log('Sending message...');
        var document = {
            to: ADMIN_UID,
            from: user.uid,
            message: messageInput,
            timestamp: new Date()
        };
        fireStoreCollectionRef.add(document).then(
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
                {olderMessages && olderMessages.map(
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