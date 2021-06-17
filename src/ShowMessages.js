import { useEffect, useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import "./css/ShowMessages.css";

const ShowMessages = (props) => {

    const messageRef = props.firestore.collection("messages");
    const receivedMessagesQuery = messageRef.where("to", "==", props.user.uid).orderBy("timestamp", "asc").limitToLast(10);
    const [receivedMessages] = useCollectionData(receivedMessagesQuery, { idField: 'id' });
    const sentMessagesQuery = messageRef.where("from", "==", props.user.uid).orderBy("timestamp", "asc").limitToLast(10);
    const [sentMessages] = useCollectionData(sentMessagesQuery, { idField: 'id' });
    var [messages] = [];
    if (receivedMessages) {

        messages = sentMessages ? sentMessages.concat(receivedMessages) : receivedMessages;
    } else {

        messages = sentMessages ? sentMessages : [];
    }
    if (messages) {
        messages.sort(
            (a, b) => { return a.timestamp > b.timestamp; }
        );
        // messages = messages.slice(0, 10);
    }
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
                                <img align={align} className="chatPicture" src={message.from !== props.adminUid ? props.user.photoURL : bharathiPhotoURL} alt="displayPicture" />
                                <p align={align} className="content">
                                    {message.message}<br />
                                    {sentTime}<br />
                                    {props.adminUid === props.user.uid && message.displayName}
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