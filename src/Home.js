import './css/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
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
                    <FontAwesomeIcon icon={faSignInAlt} className="fa-5x icon" /> 
                    <br />Sign in with Google
                </div>
                
        </div>
     );
}
 
export default Home;