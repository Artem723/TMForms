import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import HeaderLoggedIn from "../Headers/HeaderLoggedIn"
import HeaderUnloggedIn from "../Headers/HeaderUnloggedIn"
import Footer from "../Footer"

let data = {
  token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  eyJsb2dpbiI6IlRlc3RVc2VyMSIsImlhdCI6MTQ4NzkyNzQ4MSwiZXhwIjoxNDg4NTMyMjgxfQ.
  CPee3ZYCyBspus2XOHK5W6HTJF0WA0mlyA2SUfmjX6Y`
}

class App extends Component {
  render() {
    let path = this.props.location.pathname;
    let header = data.token ? <HeaderLoggedIn token = {data.token}/> : <HeaderUnloggedIn />;
    if(path === "/LogIn" || path === "/SignUp") header = null;
    return (
      <div className="App">
        {header}
        {React.cloneElement(this.props.children, data)}
        <Footer />
      </div>
    );
  }
}

export default App;
