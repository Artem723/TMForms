import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Footer from "../Footer"
import Header from "../Header"

// let data = {
//   token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlRlc3RVc2VyMSIsImlhdCI6MTQ4NzkyNzQ4MSwiZXhwIjoxNDg4NTMyMjgxfQ.CPee3ZYCyBspus2XOHK5W6HTJF0WA0mlyA2SUfmjX6Y`
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: window.localStorage.getItem("token") || null
    };
    this.onLogInHandler = this.onLogInHandler.bind(this);
    this.onLogOutHandler = this.onLogOutHandler.bind(this);
  }
  
  onLogInHandler(token) {
    window.localStorage.setItem("token", token);
    this.setState({
      token
    });
  }

  onLogOutHandler() {
    window.localStorage.removeItem("token");
    this.setState({
      token: null
    });
  }
  render() {
    const props = {
      ...this.state, 
      onLogInHandler: this.onLogInHandler,
      onLogOutHandler: this.onLogOutHandler
    };
    return (
      <div className="App">
        <Header {...this.props} token={this.state.token} onLogOutHandler={this.onLogOutHandler}/>
        {React.cloneElement(this.props.children, props)}
        <Footer />
      </div>
    );
  }
}

export default App;
