import React, { Component } from "react"
import "./LogIn.css"

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: ""
        }
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSignInHandler = this.onSignInHandler.bind(this);
    }
    componentDidMount() {
        if (this.props.token)
            this.props.router.replace("/");
    }
    onChangeLogin(e) {
        this.setState({
            login: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onSignInHandler(e) {
        e.preventDefault();
        const { login, password } = this.state;
        if (!(/^[a-zA-Z0-9_]{3,15}$/.test(login))) {
            alert("Login is incorrect.");
            return;
        }
        if (password.length < 5) {
            alert("Password is incorrect");
            return;
        }
        const headers = {
            "Content-Type": "application/json",

        }
        const body = {
            login: login,
            password: password
        }
        const option = {
            method: "POST",
            headers,
            body: JSON.stringify(body),
            cache: "no-store"
        }
        let status;
        fetch("/api/authentication", option)
            .then((response) => {
                status = response.status;
                return response.json();
            })
            .then((body) => {
                if (status !== 200) {
                    const message = body && body.message;
                    alert("Something goes wrong. Status " + status + ". Message: " + message);
                } else {
                    let token = body && body.token;
                    this.props.onLogInHandler(token);
                    this.props.router.replace("/");
                }
            })
            .catch((err) => {
                throw err;
            })
    }
    render() {
        return (
            <div className="LogIn-container">
                <form onSubmit={this.onSignInHandler}>
                    <div>Login</div>
                    <input type="text" onChange={this.onChangeLogin} />
                    <div>Password</div>
                    <input type="password" onChange={this.onChangePassword} />
                    <input type="submit" className="LogIn-signin-btn" value="Sign in" />
                </form>
            </div>
        )
    }
}