import React, { Component } from "react"
//import { Link } from "react-router"
import "./FormTile.css"

export default class FormTile extends Component {
    render() {
        let {title, onDeleteHandler, onGoToFormHAndler} = this.props;
        return (
            <div onClick={onGoToFormHAndler}>
                <div className="FormTile">
                    <div>{title}</div>
                    <button onClick={onDeleteHandler}>delete</button>
                </div>
            </div>
        )
    }
}

FormTile.propTypes = {
    title: React.PropTypes.string.isRequired,
    onDeleteHandler: React.PropTypes.func.isRequired,
    onGoToFormHAndler: React.PropTypes.func.isRequired
}