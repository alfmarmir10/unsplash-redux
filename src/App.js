import React from 'react'
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { store } from './store/store';
import Home from './views/Home';
import Login from './views/Login';
import Saved from './views/Saved';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Saved">
            <Saved />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
