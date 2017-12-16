import React, { Component } from 'react';
import { withRouter } from 'react-router'

class App extends Component {

  componentWillMount() {
    console.log("boop!")
    this.unlisten = this.props.history.listen((location, action) => {
     alert("Can you see me?")
    });
  }
  componentWillUnmount() {
      this.unlisten();
  }
  render() {
     return (
         <div>{this.props.children}</div>
      );
  }
}
export default withRouter(App);