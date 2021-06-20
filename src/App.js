import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt, faHome, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import './css/App.css';
import Chatroom from './Chatroom';
import Chat from './Chat';
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from "./ENV_CONSTANTS";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID

};
firebase.initializeApp(firebaseConfig);

function App() {

  const [showGroupChat, setShowGroupChat] = useState(false);
  const [showPersonalChat, setShowPersonalChat] = useState(false);
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  const loginWithGoogle = () => {

    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleAuthProvider);
  };

  const logout = () => {
    if (window.confirm('Do you want to sign out?')) {
      auth.signOut();
      setShowPersonalChat(false);
      setShowGroupChat(false);
    }
  };

  const openService = (service) => {

    if (service === 'chat') {

      setShowPersonalChat(true);
    } else {

      setShowGroupChat(true);
    }
  };

  return (
    <div className="App" >
      <div className="header">
        <b className="pageTitle">Chat with Bharathi</b>
        <FontAwesomeIcon icon={faSignOutAlt} style={{ display: user ? "block" : "none" }} className="fa-3x icon logout" onClick={logout} />
        <FontAwesomeIcon icon={faHome} style={{ display: (user && (showGroupChat || showPersonalChat)) ? "block" : "none" }} className="fa-3x icon logout" onClick={() => { setShowGroupChat(false); setShowPersonalChat(false); }} />
      </div>
      <div className="welcomeMessage" style={{ display: user ? "none" : "block" }}>
        <p>
          This App is created to apply my reacting and integrate it with Firebase for the backend.<br />
          Play around with it and let me know if you like it.Cheers!
        </p>
        <FontAwesomeIcon icon={faSignInAlt} className="fa-4x icon" onClick={loginWithGoogle} />
        <br />Sign in with Google
      </div>
      <div className="userInfo" style={{ display: user == null ? "none" : "block" }}>
        {user != null && <p>
          You are logged in as <span>{user.displayName}</span><br /><br />
        </p>}
      </div>
      <div className="appNavigation" style={{ display: (user && !showGroupChat && !showPersonalChat) ? "block" : "none" }}>

        <h4>Here you can do two things</h4> <br />
        <p>
          Chat with Bharathi &nbsp; <FontAwesomeIcon icon={faUser} className="fa-2x icon" onClick={() => openService('chat')} /> <br />
          <br />
          Go to Chatroom &nbsp; <FontAwesomeIcon icon={faUsers} className="fa-2x icon" onClick={() => openService('chatroom')} /> <br />
        </p>
      </div>
      <div className="serviceArea" style={{ display: (showGroupChat || showPersonalChat) ? "block" : "none" }}>
        {showGroupChat ? <Chatroom firebase={firebase} /> : (showPersonalChat) ? <Chat firebase={firebase} /> : <div>Service Unavailable</div>}
      </div>
    </div>
  );
}


export default App;