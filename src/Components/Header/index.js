import React, {Component} from "react"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderUnloggedIn from "./HeaderUnloggedIn"

export default class Header extends Component {
    render() {
        let token = this.props.token;
        let path = this.props.location.pathname;
        let header = token ? <HeaderLoggedIn  token={token}/> : <HeaderUnloggedIn  />;
        if (path === "/LogIn" || path === "/SignUp") header = null;
        return (header && React.cloneElement(header, this.props));       
    }
}