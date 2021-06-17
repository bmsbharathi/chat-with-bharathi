import { useCollectionData } from 'react-firebase-hooks/firestore';
import "./css/ShowMessages.css"
import SentMessage from './SentMessage';
const ShowMessages = (props) => {

    const messageRef = props.firestore.collection("messages");
    const receivedMessagesQuery = messageRef.where("to", "==", props.user.displayName).orderBy("timestamp", "asc").limitToLast(10);
    const [messages] = useCollectionData(receivedMessagesQuery, { idField: 'id' });

    return (
        <div className="showMessages">

            {
                messages && messages.map(
                    (message) => {
                        message.timestamp = message.timestamp.toDate().toLocaleTimeString('en-IN');
                        if (message.from === props.user.displayName) {
                            return (<SentMessage user={props.user} message={message} key={message.id} />)
                        } else {
                            return (
                                <p className="receivedMessage" key={message.id}>
                                    <img className="chatPicture" src={props.user.photoURL} alt="displayPicture" />&nbsp;
                                    { }: &nbsp; {message.message}
                                </p>
                            )
                        }




                    }
                )
            }
        </div>
    );
}

export default ShowMessages;