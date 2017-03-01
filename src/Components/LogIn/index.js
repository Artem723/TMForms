import React, {Component} from "react"
import "./LogIn.css"

export default class LogIn extends Component {
    render() {
        return (
            <div className="LogIn-container">
                <div>Login</div>
                <input type="text"/>
                <div>Password</div>
                <input type="text" />
                <button className="LogIn-signin-btn">Sign in</button>
            </div>
        )
    }
}