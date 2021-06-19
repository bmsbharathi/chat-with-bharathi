import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';


const Chatroom = (props) => {

    const [firestore, setFireStore] = useState(props.firebase.firestore());
    const [auth, setAuth] = useState(props.firebase.auth());
    const [messageInput, setMessageInput] = useState("");
    const loggedInUser = auth.currentUser;
    const firestoreCollectionRef = firestore.collection("chatroom");
    const chatroomMessagesQuery = firestoreCollectionRef.orderBy("timestamp", "asc").limitToLast(10);
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
            <div>
                {chatroomMessages && chatroomMessages.map(
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

export default Chatroom;