import React, { Component } from "react"
import "./SignUp.css"

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            repeatPassword: ""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSignUpHandler = this.onSignUpHandler.bind(this);

    }
    componentDidMount() {
        if(this.props.token)
            this.props.router.replace("/");
    }
    onChangeHandler(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        })
    }
    onSignUpHandler(e) {
        e.preventDefault();
        const { login, password, repeatPassword } = this.state;
        if (password !== repeatPassword) {
            alert("You do not repeat your password correctly");
            return;
        }
        if (!(/^[a-zA-Z0-9_]{3,15}$/.test(login))) {
            alert("Your login is incorrect. It must be combinations of symbols a-z, A-Z , 0-9 and '_'; and number of symbols should be from 3 to 15.");
            return;
        }
        if (password.length < 5) {
            alert("Password too small");
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
        fetch("/api/registration", option)
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
                console.log(err);
            })

    }
    render() {
        return (
            <div className="SignUp-container">
                <form onSubmit={this.onSignUpHandler}>
                    <div>Login</div>
                    <input type="text" name="login" onChange={this.onChangeHandler} />
                    <div>Password</div>
                    <input type="password" name="password" onChange={this.onChangeHandler} />
                    <div>Repeat Password</div>
                    <input type="password" name="repeatPassword" onChange={this.onChangeHandler} />
                    <input type="submit" className="SignUp-signup-btn" value="Sign Up"/>
                </form>
            </div>
        )
    }
}