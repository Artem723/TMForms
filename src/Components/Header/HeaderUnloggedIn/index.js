import React, {Component} from "react"
import { Link } from "react-router"
import "../header.css"

export default class HeaderUnloggedIn extends Component {
    render() {
        const {onGoToLogInHandler, onGoToSignUpHandler} = this.props;
        return (
            <ul className="navigation-bar">
                <li><Link to="/logIn">React Forms</Link></li>
                <li className="right"><Link to="/signUp">sign up</Link></li>
                <li className="right"><Link to="/logIn">log in</Link></li>                
            </ul>
        )
    }
}