import firebase from 'firebase/app';
import Home from './Home';
import Chat from './Chat';
import './css/App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom';

  var firebaseConfig = {

  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
              <Home firebase={firebase} />
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