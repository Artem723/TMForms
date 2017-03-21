import React from "react"
import {
    FormGroup, 
    ControlLabel, 
    FormControl, 
    HelpBlock
} from "react-bootstrap"

export default function FieldGroup(props) {
    const {validationState, label, help, ...rest} = props;
    return(
        <FormGroup validationState={validationState}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...rest}/>
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    )
}
