import React from "react"
import {Alert, Button} from "react-bootstrap"

export default function ErrorAlert(props) {
    const { header, main, footer, ...rest } = props;
    return (
        <Alert bsStyle="danger"  {...rest}>
            {header && <h4>{header}</h4>}
            <p>{main}</p>
            {footer && <p>{footer}</p>}
        </Alert>
    )
}

ErrorAlert.propTypes = {
    main: React.PropTypes.string.isRequired,
} 