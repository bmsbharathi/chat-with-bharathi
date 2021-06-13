import './css/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from "react-router-dom";
import 'firebase/firestore';
import ReactSession from 'react-client-session';

const Home = ({user,auth,firestore}) => {

    const authWithGoogle = () => {

        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(googleAuthProvider);
        console.log("User is ...........",user);
        ReactSession.setStoreType("localStorage");
        ReactSession.set("user", user);
    };

    return ( 
        <div className="home">
                <h1 className="title">Chat with Bharathi</h1>
                <div className="description">
                    <span>
                        This App is created to apply my reacting and integrate it with Firebase for the backend.<br/>
                        Play around with it and let me know if you like it. Cheers!
                    </span>
                </div>
                
        <div className="login">
            <FontAwesomeIcon icon={faSignInAlt} className="fa-5x icon" onClick={authWithGoogle} /> 
            <br />Sign in with Google
        </div> 
        
        user && <Redirect to="/chat" />

                    
        </div>
     );
}
 
export default Home;