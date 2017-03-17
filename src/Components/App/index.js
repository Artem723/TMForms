import React, { Component } from "react";
import "./App.css";
import Footer from "../Footer"
import Header from "../Header"


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

        <Header {...this.props} token={this.state.token} onLogOutHandler={this.onLogOutHandler} />
        
        <main>
          <div className="container">
            {React.cloneElement(this.props.children, props)}
          </div>
        </main>

        {<Footer />}

      </div>
    );
  }
}

export default App;
