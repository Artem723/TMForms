import React, { Component } from "react"

export default class EnsureLoggedIn extends Component {

    componentDidMount() {
        if (!this.props.token) {
            this.props.router.replace("/LogIn");
        }
    }

    render() {
        if (!this.props.token) {
            return null;
        }
        return this.props.children;
    }
}