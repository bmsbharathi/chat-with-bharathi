import { useState } from 'react';
import './css/Chat.css';
import 'firebase/firestore';

const Chat = (props) => {
    
    const [message,setMessage] = useState('');
    // const oldMessages = firestore.

    const sendMessage = () => {
        console.log('Sending message...');
    };

    const updateMessage = (evt)=>{

        setMessage(evt.target.value);
    };

    const signOut = () =>{

        props.logout();
    }

    return ( 
        
        <div className="chat">
            <div className="header">
                <h1>Chat with Bharathi</h1>
                <button onClick={signOut}>Sign Out</button>
            </div>
            <div className="messages">

            </div>
            <div className="textArea">
                <form onSubmit={sendMessage}>
                    <input name="message" onChange={updateMessage} />
                    <button type="submit">Send!</button>
                </form>
            </div>
        </div>
     );
}
 
export default Chat;