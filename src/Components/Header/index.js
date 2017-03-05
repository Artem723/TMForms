import React, {Component} from "react"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderUnloggedIn from "./HeaderUnloggedIn"

export default class Header extends Component {
    render() {
        const token = this.props.token;
        const path = this.props.location.pathname;
        let header;
        if (/^\/login$/i.test(path) || /^\/signup$/i.test(path)) header = null;
        else header = token ? <HeaderLoggedIn  token={token}/> : <HeaderUnloggedIn  />;
        return (header && React.cloneElement(header, this.props));       
    }
}