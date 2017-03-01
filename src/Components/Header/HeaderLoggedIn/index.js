import React, {Component} from "react"
import "../header.css"

export default class HeaderLoggedIn extends Component {
    render() {
        let payload = this.props.token.split(".")[1];
        let login = JSON.parse( atob(payload) ).login;
        return (
            <div className="header">
                <span><button>Home</button></span>
                {' '}hello, {login}!{' '}
                <span><button>Exit</button></span>
                <hr />
            </div>
        )
    }
}