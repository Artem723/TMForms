import React from "react"
import {Alert, Button} from "react-bootstrap"

export default function ErrorAlert(props) {
    const { onHide } = props;
    return (
        <Alert bsStyle="danger" onDismiss={onHide}>
            <h4>Oh, something went wrong!</h4>
            <p>We've got network issue. We try to do everything so that it does not happen again</p>

            <p><Button onClick={onHide}>OK</Button></p>
        </Alert>
    )
} 