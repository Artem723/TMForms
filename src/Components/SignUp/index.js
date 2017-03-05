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
    onChangeHandler(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        })
    }
    onSignUpHandler() {
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
        fetch("/api/registration", option)
        .then((response)=>{
            if(response.status !== 200)
                alert("something goes wrong. Status " + response.status);
            else 
                response.json();
        })
        .then((body) => {
            console.log(body);
        })
        .catch((err)=>{

        })

    }
    render() {
        return (
            <div className="SignUp-container">
                <div>Login</div>
                <input type="text" name="login" onChange={this.onChangeHandler} />
                <div>Password</div>
                <input type="password" name="password" onChange={this.onChangeHandler} />
                <div>Repeat Password</div>
                <input type="password" name="repeatPassword" onChange={this.onChangeHandler} />
                <button className="SignUp-signup-btn" onClick={this.onSignUpHandler}>Sign up</button>
            </div>
        )
    }
}