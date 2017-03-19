import React, { Component } from "react"
import { Link } from "react-router"
import DeleteModal from "./DeleteModal"
import "./FormTile.css"

export default class FormTile extends Component {
    constructor(props){
        super(props);
        this.state= {
            showModal: false
        }
        this.onShowModal = this.onShowModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }
    onShowModal(e) {
        e.preventDefault();
        this.setState({
            showModal: true
        })
    }

    onCloseModal() {
        this.setState({
            showModal: false
        })
    }
    render() {
        const {title, onDeleteHandler, formID} = this.props;
        const showModal = this.state.showModal;
        return (
                <Link to={`/forms/${formID}/edit`} className="FormTile">
                    <DeleteModal show={showModal} onClose={this.onCloseModal} onDelete={onDeleteHandler}/>
                    <div>{title}</div>
                    <button onClick={this.onShowModal}>delete</button>
                </Link>
        )
    }
}

FormTile.propTypes = {
    title: React.PropTypes.string.isRequired,
    onDeleteHandler: React.PropTypes.func.isRequired,
    formID: React.PropTypes.string.isRequired
}