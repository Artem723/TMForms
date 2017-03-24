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
             {label && <ControlLabel>{label}</ControlLabel>}
            <FormControl {...rest}/>
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    )
}

FieldGroup.Static = function FieldGroupStatic(props)  {
    const {validationState, label, help, value,...rest} = props;
    return(
        <FormGroup validationState={validationState}>
            {label && <ControlLabel>{label}</ControlLabel>}
            <FormControl.Static {...rest}>
                {value}
            </FormControl.Static>
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    )
}

FieldGroup.propTypes = {
    validationState: React.PropTypes.oneOf(['success', 'warning', 'error', null]),
    label: React.PropTypes.string,
    help: React.PropTypes.string,
    value: React.PropTypes.string
}

FieldGroup.Static.propTypes = {
    validationState: React.PropTypes.oneOf(['success', 'warning', 'error', null]),
    label: React.PropTypes.string,
    help: React.PropTypes.string,
    value: React.PropTypes.string
}
