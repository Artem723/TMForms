import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Footer from "../Footer"
import Header from "../Header"

let data = {
  token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlRlc3RVc2VyMSIsImlhdCI6MTQ4NzkyNzQ4MSwiZXhwIjoxNDg4NTMyMjgxfQ.CPee3ZYCyBspus2XOHK5W6HTJF0WA0mlyA2SUfmjX6Y`
}

class App extends Component {
  render() {

    return (
      <div className="App">
        <Header {...this.props} token={data.token}/>
        {React.cloneElement(this.props.children, data)}
        <Footer />
      </div>
    );
  }
}

export default App;
