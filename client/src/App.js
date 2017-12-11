import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header'
import Login from './components/Login'
import NoMatch from './components/NoMatch'

class App extends Component {
  render() {
    return (
      <div>
        <Header/>

        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route component={NoMatch} />
          </Switch>


        </Router>
      </div>
    );
  }
}

export default App;
