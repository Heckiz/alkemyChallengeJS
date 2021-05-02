import React from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom'
import './styles/App.scss'

//Components
import Navigation from './components/Navbar';
import Home from './views/Home';

//Redux
import { Provider } from 'react-redux'
import generateStore from './redux/store'
import Register from './components/users/Register';
import Login from './components/users/Login';


function App() {

  const store = generateStore();
  return (
    <Provider store={store}>

        <Router>
          <Navigation/>
          <Switch>
            <Route path="/" exact component={Home} ></Route>
            <Route path="/signup" exact component={Register} ></Route>
            <Route path="/signin" exact component={Login} ></Route>

          </Switch>
        </Router>

    </Provider>
  );
}

export default App;
