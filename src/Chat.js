import { useState } from 'react';
import './css/Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import 'firebase/firestore';

const Chat = (props) => {
    const firestore = props.firebase.firestore();
    const auth = props.firebase.auth();
    const [message, setMessage] = useState('');
    var loggedInUser = auth.currentUser;
    console.log("DisplayName::::::::", loggedInUser.photoURL);

    const sendMessage = (evt) => {
        evt.preventDefault();
        console.log('Sending message...');
    };

    const updateMessage = (evt) => {

        setMessage(evt.target.value);
    };

    const logout = () => {
        alert('logout executed!!!')
        auth.signOut();
    };

    return (

        <div className="chat">
            <div className="header">
                <div className="logout">
                    <FontAwesomeIcon icon={faSignOutAlt} className="fa-3x" onClick={logout} />

                </div>
                <div className="title">
                    <h1>Chat with Bharathi</h1>
                    <p>You are logged in as <span>{loggedInUser.displayName}</span></p>
                    <img src={loggedInUser.photoURL} alt="displayimage" />
                </div>
            </div>
            <div className="messages">

            </div>
            <div className="textArea">
                <form onSubmit={sendMessage}>
                    <input name="message" placeholder="Say Something!" onChange={updateMessage} />
                    <button type="submit">Send!</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;