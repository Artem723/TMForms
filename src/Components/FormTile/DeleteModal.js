import React from "react"
import { Modal, Button } from "react-bootstrap"

export default function DeleteModal(props) {
    const {show, onClose, onDelete} = props;
    return (
        <Modal restoreFocus={true} show={show} onHide={onClose}>
            <Modal.Body>
                Are you sure you wont to delete the form.
            </Modal.Body>
            <Modal.Footer>
                 <Button onClick={onClose}>No</Button>
                 <Button onClick={onDelete} bsStyle="primary">Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}