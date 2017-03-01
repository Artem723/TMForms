import React, { Component } from "react"
import { Link } from "react-router"
import "./FormTile.css"

export default class FormTile extends Component {
    render() {
        let {title} = this.props;
        return (
            <Link to="/forms/awdawd/edit">
                <div className="FormTile">
                    <div>{title}</div>
                    <button>delete</button>
                </div>
            </Link>
        )
    }
}

FormTile.propTypes = {
    title: React.PropTypes.string.isRequired,
}