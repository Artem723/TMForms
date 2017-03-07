import React, {Component} from "react"
import "../header.css"

export default class HeaderLoggedIn extends Component {
    render() {
        const payload = this.props.token.split(".")[1];
        const onLogOutHandler = this.props.onLogOutHandler;
        const onGoToHomeHandler = this.props.onGoToHomeHandler;
        const login = JSON.parse( atob(payload) ).login;
        return (
            <div className="header">
                <span><button onClick={onGoToHomeHandler}>Home</button></span>
                {' '}hello, {login}!{' '}
                <span><button onClick={onLogOutHandler}>Exit</button></span>
                <hr />
            </div>
        )
    }
}