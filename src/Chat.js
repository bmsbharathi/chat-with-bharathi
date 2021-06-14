import { useState } from 'react';
import './css/Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
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
                <div className="logout">
                <FontAwesomeIcon icon={faSignOutAlt} className="fa-3x" onClick={signOut} /> 
                        
                </div>
                <div className="title">
                        <h1>Chat with Bharathi</h1>
                </div>
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