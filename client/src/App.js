import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header'
import Login from './components/Login'
import Pickroom from './components/Pickroom'
import Chatroom from './components/Chatroom'
import NoMatch from './components/NoMatch'

class App extends Component {
  render() {
    return (
      <div>
        <Header/>

        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/pickroom" component={Pickroom} />
            <Route exact path="/chatroom" component={Chatroom} />
            <Route component={NoMatch} />
          </Switch>

        </Router>
      </div>
    );
  }
}

export default App;
