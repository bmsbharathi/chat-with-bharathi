import { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
const ShowMessages = (props) => {

    const messageRef = props.firestore.collection("messages");
    const receivedMessagesQuery = messageRef.where("to", "==", props.user.displayName);
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
                        var sentTime = new Date(message.timestamp);

                        return <p align={alignment} key={message.id}>{sentTime.toLocaleTimeString()}:&nbsp;{message.message}</p>

                    }
                )
            }

            {/* {messages.sort((a, b) => {
                return a.timestamp > b.timestamp;
            })
            }
            {messages.forEach(
                (message) => {
                    if (message.from === props.user.displayName) {
                        <p align="right">message.message</p>
                    } else {
                        <p align="left">message.message</p>
                    }
                }
            )}  */}
        </div>
    );
}

export default ShowMessages;