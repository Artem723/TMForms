import React, { Component } from "react"

export default class EnsureLoggedIn extends Component {

    componentDidMount() {
        if (!this.props.token) 
            this.props.router.replace("/LogIn");        
    }
    componentDidUpdate() {
        if (!this.props.token) 
            this.props.router.replace("/LogIn");       
    }

    render() {
        //let children = this.props.children;
        if (!this.props.token) {
            return null;
        }
        return this.props.children && React.cloneElement(this.props.children, this.props);
    }
}