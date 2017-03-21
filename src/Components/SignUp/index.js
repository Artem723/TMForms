import React, { Component } from "react"
import { Col } from "react-bootstrap"
import FieldGroup from "../FieldGroup"
import { Button } from "react-bootstrap"
import { Link } from "react-router"
import ErrorAlert from "../ErrorAlert"
import "./SignUp.css"

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            repeatPassword: "",
            errorAlertText: null,
            isLoginIncorrect: false,
            isPasswordIncorrect: false
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSignUpHandler = this.onSignUpHandler.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
        this.onHideAlert = this.onHideAlert.bind(this);

    }
    componentDidMount() {
        if (this.props.token)
            this.props.router.replace("/");
    }
    componentDidUpdate() {
        if (this.props.token)
            this.props.router.replace("/");
    }
    onChangeHandler(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value,
            isLoginIncorrect: false,
            isPasswordIncorrect: false
        })
    }
    onSignUpHandler(e) {
        e.preventDefault();
        const { login, password, repeatPassword } = this.state;
        if (password !== repeatPassword) {
            this.setState({
                errorAlertText: "You didn't repeat your password correctly",
                isPasswordIncorrect: true
            });
            return;
        }
        if (!(/^[a-zA-Z0-9_]{3,15}$/.test(login))) {
            this.setState({
                errorAlertText: "Your login is incorrect. It must be combinations of symbols a-z, A-Z , 0-9 and '_'; and number of symbols should be from 3 to 15.",
                isLoginIncorrect: true
            })
            return;
        }
        if (password.length < 5) {
            this.setState({
                errorAlertText: "Password too small",
                isPasswordIncorrect: true
            })
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
                if (status >= 500)
                    this.setState({
                        errorAlertText: "Oh, we've got server issue. We try to do everything so that it does not happen again.",
                    })
                else if (status === 400)
                    this.setState({
                        errorAlertText: "User with this login already exists.",
                        isLoginIncorrect: true
                    })
                else if (status === 200)
                    return response.json();
            })
            .then((body) => {
                const token = body && body.token;
                this.props.onLogInHandler(token);
            })
            .catch((err) => {
                throw err;
            })

    }
    /**
     * function returns value for bootstrap input validation state
     * @param {String} type type of input (e.g. "text", "password" and so on) 
     */
    getValidationState(type) {
        const { isLoginIncorrect, isPasswordIncorrect } = this.state;
        if (type === "login") {
            return isLoginIncorrect ? "error" : null;
        } else if (type === "password") {
            return isPasswordIncorrect ? "error" : null;
        }
        return null;
    }

    onHideAlert() {
        this.setState({
            errorAlertText: null
        })
    }

    render() {
        const { errorAlertText } = this.state;
        const loginFieldProps = {
            validationState: this.getValidationState("login"),
            type: "text",
            label: "Login",
            name: "login",
            onChange: this.onChangeHandler
        }
        const passwordFieldProps = {
            type: "password",
            validationState: this.getValidationState("password"),
            label: "Password",
            name: "password",
            onChange: this.onChangeHandler
        }
        const passwordRepeatFieldProps = {
            type: "password",
            validationState: this.getValidationState("password"),
            label: "Repeat Password",
            name: "repeatPassword",
            onChange: this.onChangeHandler
        }
        let errorAlert = null;
        if (errorAlertText) {
            errorAlert = (
                <ErrorAlert main={errorAlertText} onDismiss={this.onHideAlert} />
            )
        }
        return (
            <section className="SignUp-container">
                <Col md={8} mdOffset={2} lg={4} lgOffset={4}>
                    <header className="logo-text">React Forms</header>
                    <p className="title">Registration</p>
                    <form onSubmit={this.onSignUpHandler} className="bordered">
                        <FieldGroup {...loginFieldProps} />
                        <FieldGroup  {...passwordFieldProps} />
                        <FieldGroup {...passwordRepeatFieldProps} />
                        <Button type="submit" bsStyle="success" block>Sign Up</Button>
                    </form>
                    {errorAlert}
                    <section className="bordered">
                        Do you have an Account? <Link to="/LogIn">Log in.</Link>
                    </section>
                </Col>
            </section>
        )
    }
}