import React, { Component } from "react"
import "./SignUp.css"

export default class SignUp extends Component {
    render() {
        return (
            <div className="SignUp-container">
                <div>Login</div>
                <input type="text" />
                <div>Password</div>
                <input type="text" />
                <div>Repeat Password</div>
                <input type="text" />
                <button className="SignUp-signup-btn">Sign up</button>
            </div>
        )
    }
}