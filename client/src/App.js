import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Appcontainer from './components/Appcontainer'
import Header from './components/Header'
import Login from './components/Login'
import Pickroom from './components/Pickroom'
import Chatroom from './components/chatRoom'
import NoMatch from './components/NoMatch'

class App extends Component 
{

  leaving = () =>
  {
    alert("okay, I'm leaving now!")
  }

  render() {
    return (
      <div>
        <Header/>

        <Router>
          <Appcontainer>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/pickroom" component={Pickroom} />
              <Route exact path="/chatroom" onChange={this.leaving} component={Chatroom} />
              <Route component={NoMatch} />
            </Switch>
          </Appcontainer>
        </Router>
      </div>
    );
  }
}

export default App;
