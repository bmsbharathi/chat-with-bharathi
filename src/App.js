import React from 'react';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'firebase/auth';
import { faSignOutAlt, faSignInAlt, faUsers, faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './css/App.css';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

};
firebase.initializeApp(firebaseConfig);

function App() {

  const showGroupChat = false;
  const showPersonalChat = false;
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  const loginWithGoogle = () => {

    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleAuthProvider);
  };

  const logout = () => {
    if (window.confirm('Do you want to sign out?'))
      auth.signOut();
  };

  return (
    <div className="App" >
      <div className="header">
        <b className="pageTitle">Chat with Bharathi</b>
        <FontAwesomeIcon icon={faSignOutAlt} style={{ display: user ? "block" : "none" }} className="fa-3x signout icon" onClick={logout} />
      </div>
      <div className="welcomeMessage" style={{ display: user ? "none" : "block" }}>
        <p>
          This App is created to apply my reacting and integrate it with Firebase for the backend.<br />
          Play around with it and let me know if you like it. Cheers!
        </p>
        <FontAwesomeIcon icon={faSignInAlt} className="fa-4x icon" onClick={loginWithGoogle} />
        <br />Sign in with Google
      </div>
      <div className="appNavigation">
        <p>
          <h4>Here you can do two things</h4> <br />
          Chat with Bharathi <FontAwesomeIcon icon={faUser} className="fa-2x icon" /> <br />
          <br />
          Go to Chatroom <FontAwesomeIcon icon={faUsers} className="fa-2x icon" /> <br />
        </p>
      </div>
    </div>
  );
}


export default App;