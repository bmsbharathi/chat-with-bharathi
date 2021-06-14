import './css/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import 'firebase/auth';
import Chat from './Chat';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/firestore';

const Home = ({firebase}) => {

    const auth = firebase.auth();
    const [user] = useAuthState(auth);

    const AuthWithGoogle = () => {

        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(googleAuthProvider);
        console.log("User is ...........",user);
    };

    const logout = () => {
        alert('logout executed!!!')
        auth.signOut();
    };

    return ( 
        <div>
           { user==null ? <div className="home">
                {console.log("User is ===============",user)}
                <h1 className="title">Chat with Bharathi</h1>
                <div className="description">
                    <span>
                        This App is created to apply my reacting and integrate it with Firebase for the backend.<br/>
                        Play around with it and let me know if you like it. Cheers!
                    </span>
                </div>
                
            <div className="login">
                <FontAwesomeIcon icon={faSignInAlt} className="fa-5x icon" onClick={AuthWithGoogle} /> 
                <br />Sign in with Google
            </div>      
        </div> : <Chat logout={logout} /> }
        </div>
     );
}
export default Home;