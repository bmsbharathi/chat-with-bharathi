import firebase from 'firebase/app';
import Home from './Home';
import Chat from './Chat';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import './css/App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom';

  var firebaseConfig = {

  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function App() {

  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
              <Home user={user} auth={auth} firestore={firestore} />
          </Route>
          <Route path="/chat">
              <Chat />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;