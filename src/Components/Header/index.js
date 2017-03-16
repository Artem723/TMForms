import React, { Component } from "react"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderUnloggedIn from "./HeaderUnloggedIn"

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.onGoToHomeHandler = this.onGoToHomeHandler.bind(this);
        this.onGoToLogInHandler = this.onGoToLogInHandler.bind(this);
        this.onGoToSignUpHandler = this.onGoToSignUpHandler.bind(this);
    }
    onGoToHomeHandler() {
        this.props.router.replace("/");
    }
    onGoToLogInHandler() {
        this.props.router.replace("/LogIn");
    }
    onGoToSignUpHandler() {
        this.props.router.replace("/SignUp");
    }
    render() {
        const { token, onLogOutHandler } = this.props;
        const path = this.props.location.pathname;
        let header;
        const loggedInProps = {
            token,
            onLogOutHandler: onLogOutHandler,
            onGoToHomeHandler: this.onGoToHomeHandler
        }
        const unLoggedInprops = {
            onGoToSignUpHandler: this.onGoToSignUpHandler,
            onGoToLogInHandler: this.onGoToLogInHandler
        }
        if (/^\/login$/i.test(path) || /^\/signup$/i.test(path)) header = null;
        else header = token ? <HeaderLoggedIn  {...loggedInProps} /> : <HeaderUnloggedIn {...unLoggedInprops} />;
        return (
            <nav>
                {header && React.cloneElement(header, this.props)}
            </nav>
        );
    }
}
