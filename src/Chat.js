import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import ReactSession from 'react-client-session';
import './css/Chat.css';
import 'firebase/firestore';

const Chat = () => {
    
    var history = useHistory();
    const [message,setMessage] = useState('');
    // const oldMessages = firestore.

    const sendMessage = () => {
        console.log('Sending message...');
    };

    const updateMessage = (evt)=>{

        setMessage(evt.target.value);
    };

    const signOut = () =>{
        var auth = ReactSession.get("user");
        auth.signOut();
        ReactSession.set("user", null);
        history.push('/');
    }

    return ( 
        
        <div className="chat">
            {/* {console.log(ReactSession.get("user"))} */}
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