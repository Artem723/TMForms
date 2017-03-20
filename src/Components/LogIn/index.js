import React, { Component } from "react"
import {
    Col,
    Alert,
    FormGroup,
    ControlLabel,
    FormControl,
    Button
} from "react-bootstrap"
import { Link } from "react-router"
import "./LogIn.css"

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            errorAlertText: null,//if the string then show alert
            isLoginIncorrect: false,
            isPasswordIncorrect: false
        }
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSignInHandler = this.onSignInHandler.bind(this);
        this.onHideAlert = this.onHideAlert.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
    }
    componentDidMount() {
        if (this.props.token)
            this.props.router.replace("/");
    }
    onChangeLogin(e) {
        this.setState({
            login: e.target.value,
            isLoginIncorrect: false
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value,
            isPasswordIncorrect: false
        })
    }
    onSignInHandler(e) {
        e.preventDefault();
        const { login, password } = this.state;
        if (!(/^[a-zA-Z0-9_]{3,15}$/.test(login))) {
            this.setState({
                errorAlertText: "Login is incorrect",
                isLoginIncorrect: true
            });
            return;
        }
        if (password.length < 5) {
            this.setState({
                errorAlertText: "Password is Incorrect",
                isPasswordIncorrect: true
            });
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
                if(status >= 500) 
                    this.setState({
                        errorAlertText: "Oh, we've got network issue. We try to do everything so that it does not happen again"
                    });
                return response.json();
            })
            .then((body) => {
                if (status === 404) {
                    this.setState({
                        errorAlertText: "Login is incorrect",
                        isLoginIncorrect: true
                    });
                } else if(status === 401) {
                    this.setState({
                        errorAlertText: "Password is incorrect",
                        isPasswordIncorrect: true
                    });    
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
    onHideAlert() {
        this.setState({
            errorAlertText: null
        })
    }
    getValidationState(type) {
        const {isLoginIncorrect, isPasswordIncorrect} = this.state;
        if(type==="login"){
            return isLoginIncorrect ? "error" : null;
        } else if(type==="password") {
             return isPasswordIncorrect ? "error" : null;
        }
        return null;
    }
    render() {
        const { errorAlertText } = this.state;
        let errorAlert = null;
        if (errorAlertText) {
            errorAlert = (
                <Alert bsStyle="danger" onDismiss={this.onHideAlert}>
                    {errorAlertText}
                </Alert>
            )
        } 
        return (
            <section className="LogIn-container">
                <Col sm={8} smOffset={2} lg={4} lgOffset={4}>
                    <header>React Forms</header>
                    <form onSubmit={this.onSignInHandler} className="bordered">
                        <FormGroup validationState={this.getValidationState("login")}>
                            <ControlLabel>Login</ControlLabel>
                            <FormControl type="text" onChange={this.onChangeLogin} />
                        </FormGroup>
                        <FormGroup validationState={this.getValidationState("password")}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" onChange={this.onChangePassword} />
                        </FormGroup>
                        <Button type="submit" bsStyle="success" block>Sign in</Button>
                    </form>
                    {errorAlert}
                    <section className="bordered">
                        New to React Forms? <Link to="/SignUp">Create an account</Link>
                    </section>
                </Col>
            </section>
        )
    }
}