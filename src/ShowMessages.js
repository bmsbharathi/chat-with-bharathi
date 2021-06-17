import { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
const ShowMessages = (props) => {

    const messageRef = props.firestore.collection("messages");
    const receivedMessagesQuery = messageRef.orderBy("timestamp", "asc").limitToLast(10);
    const [messages] = useCollectionData(receivedMessagesQuery, { idField: 'id' });

    return (
        <div className="showMessages">

            {
                messages && messages.map(
                    (message) => {
                        var alignment = "left";
                        if (message.from === props.user.displayName) {
                            alignment = "right";
                        }
                        var sentTime = message.timestamp.toDate().toLocaleTimeString('en-IN');

                        return <p align={alignment} key={message.id}>{sentTime}:&nbsp;{message.message}</p>

                    }
                )
            }
        </div>
    );
}

export default ShowMessages;