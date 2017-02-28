import React, {Component} from "react"

export default class HeaderLoggedIn extends Component {
    render() {
        let payload = this.props.token.split(".")[1];
        let login = JSON.parse( atob(payload) ).login;
        return (
            <div>
                <span><button>Home</button></span>
                {' '}hello, {login}!{' '}
                <span><button>Exit</button></span>
            </div>
        )
    }
}