import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Chatroom = (props) => {
    const [firestore, setFireStore] = useState(props.firebase.firestore());
    const [user, setUser] = useState(props.firebase.auth().currentUser);
    var [messageInput, setMessageInput] = useState("");
    const fireStoreCollectionRef = firestore.collection("chatroom");
    var olderMessagesQuery = fireStoreCollectionRef.orderBy("timestamp", "ASC").limitToLast(10);
    var [olderMessages] = useCollectionData(olderMessagesQuery, { idField: 'id' });
    useEffect(
        () => {
            setFireStore(props.firebase.firestore());
            setUser(props.firebase.auth().currentUser);
        }, [props.firebase,]
    );

    const sendMessage = (evt) => {

        evt.preventDefault();
        var messageDocument = {
            message: messageInput,
            sender: user.displayName,
            timestamp: new Date(),
            displayPhoto: user.photoURL
        };
        console.log("Document:::::::", messageDocument);
        fireStoreCollectionRef.add(messageDocument).then(
            (response) => {
                console.log("successfully posted!", response);
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

export default Chatroom;