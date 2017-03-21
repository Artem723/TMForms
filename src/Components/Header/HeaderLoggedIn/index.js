import React, { Component } from "react"
import { Link } from "react-router"
import {Glyphicon} from "react-bootstrap"
import "../header.css"

export default class HeaderLoggedIn extends Component {
    render() {
        const payload = this.props.token.split(".")[1];
        const onLogOutHandler = this.props.onLogOutHandler;
        const onGoToHomeHandler = this.props.onGoToHomeHandler;
        const login = JSON.parse(atob(payload)).login;
        return (
            <ul className="navigation-bar">
                <li><Link to="/">React Forms</Link></li>
                <li><Link to="/">Home</Link></li>               
                <li className="right"><a href="#" onClick={onLogOutHandler}>Exit  <Glyphicon glyph="log-out" /></a></li>
                <li className="right"><span className="user-login">user: {login}</span></li>
            </ul>
        )
    }
}