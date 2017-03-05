import React, {Component} from "react"
import "./LogIn.css"

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: ""
        }
        this.onChangeLogIn = this.onChangeLogIn.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSignInHandler = this.onSignInHandler.bind(this);
    }
    onChangeLogIn(e) {
        this.setState({
            login: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onSignInHandler() {
        
    }
    render() {
        return (
            <div className="LogIn-container">
                <div>Login</div>
                <input type="text" onChange={this.onChangeLogIn}/>
                <div>Password</div>
                <input type="text" onChange={this.onChangePassword}/>
                <button className="LogIn-signin-btn" onClick={this.onSignInHandler}>Sign in</button>
            </div>
        )
    }
}