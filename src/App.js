import firebase from 'firebase/app';
import Home from './Home';
import './css/App.css';

var firebaseConfig = {

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {

  return (
    <div className="App">
      <Home firebase={firebase} />
    </div>
  );
}

export default App;