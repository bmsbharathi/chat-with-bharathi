import { useCollectionData } from 'react-firebase-hooks/firestore';
import "./css/ShowMessages.css";

const ShowMessages = (props) => {

    const messageRef = props.firestore.collection("messages");
    const receivedMessagesQuery = messageRef.where("to", "==", props.user.uid).orderBy("timestamp", "asc").limitToLast(10);
    const [messages] = useCollectionData(receivedMessagesQuery, { idField: 'id' });
    const bharathiPhotoURL = "/bms_dp.png";
    return (
        <div className="showMessages">

            {
                messages && messages.map(
                    (message) => {
                        var sentTime = message.timestamp.toDate().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
                        var align = "left";
                        if (message.from === props.user.uid) {
                            align = "right";
                        }
                        return (
                            <div className="sentMessage" key={message.id}>
                                <img align={align} className="chatPicture" src={align === "right" ? props.user.photoURL : bharathiPhotoURL} alt="displayPicture" />
                                <p align={align} className="content">
                                    {message.message}<br />
                                    {sentTime}
                                </p>
                            </div>
                        )
                    }
                )
            }
        </div>
    );
}

export default ShowMessages;