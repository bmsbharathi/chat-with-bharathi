import { useState } from 'react';
import './css/Chat.css';
import ShowMessages from './ShowMessages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import 'firebase/firestore';

const Chat = (props) => {
    const firestore = props.firebase.firestore();
    const auth = props.firebase.auth();
    const adminUid = "cJ8EZwTgp7VGS9sMoC9ZThNrRax1";
    const [toUid, setToUid] = useState("");
    const [message, setMessage] = useState("");
    var loggedInUser = auth.currentUser;
    console.log(loggedInUser.uid);
    const messageRef = firestore.collection("messages");

    const sendMessage = (evt) => {
        evt.preventDefault();
        console.log('Sending message...');
        var document = {
            to: adminUid,
            displayName: loggedInUser.displayName,
            from: loggedInUser.uid,
            message: message,
            timestamp: new Date()
        };
        messageRef.add(document).then(
            () => {
                console.log("successfully posted from ", loggedInUser.uid);
                setMessage("");
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    };

    const updateMessage = (evt) => {

        setMessage(evt.target.value);

    };

    const logout = () => {
        if (window.confirm('Do you want to sign out?'))
            auth.signOut();
    };

    const sendMessageAsAdmin = (evt) => {
        evt.preventDefault();
        console.log('Sending message as Admin...');
        var document = {
            to: toUid,
            displayName: loggedInUser.displayName,
            from: loggedInUser.uid,
            message: message,
            timestamp: new Date()
        };
        messageRef.add(document).then(
            () => {
                console.log("successfully posted from ", loggedInUser.uid);
                setMessage("");
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
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
            <ShowMessages firestore={firestore} user={loggedInUser} adminUid={adminUid} />
            <div className="textArea">
                <form onSubmit={sendMessage}>
                    <input className="messageBar" name="message" value={message} placeholder="Say Something!" onChange={updateMessage} />
                    <FontAwesomeIcon icon={faPaperPlane} onClick={loggedInUser.uid === adminUid ? sendMessageAsAdmin : sendMessage} className="fa-2x icon" />
                    {loggedInUser.uid === adminUid && < input className="adminMessageBar" placeholder="For Admin Only!" onChange={event => setToUid(event.target.value)} />}
                </form>
            </div>
        </div>
    );
}

export default Chat;