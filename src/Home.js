import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
const Home = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <App />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>);
}

export default Home;