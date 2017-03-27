import React from "react"
import {Alert} from "react-bootstrap"

export default function AlertBlock(props) {
    const { header, main, footer, ...rest } = props;
    return (
        <Alert {...rest}>
            {header && <h4>{header}</h4>}
            <p>{main}</p>
            {footer && <p>{footer}</p>}
        </Alert>
    )
}

AlertBlock.propTypes = {
    main: React.PropTypes.string.isRequired,
} 