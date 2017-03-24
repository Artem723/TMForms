import React from "react"
import {
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap"
export default function SelectGroup(props) {
    const {value, label, optionsValues, optionsText, ...rest} = props;
    if(optionsValues.length !== optionsText.length) console.error("Warning: optionsValues length doesn't equal to optionsText length in SelectGroup");
    const options = optionsValues.map((el, ind)=>{
        return <option key={el} value={el}>{optionsText[ind]}</option>
    })
    return (
        <FormGroup controlId="formControlsSelect">
            {label && <ControlLabel>{label}</ControlLabel>}
            <FormControl value={value} componentClass="select" {...rest} >
                {options}
            </FormControl>
        </FormGroup>
    )
}

SelectGroup.propTypes = {
    value: React.PropTypes.string,
    optionsValues: React.PropTypes.arrayOf(React.PropTypes.string),
    optionsText: React.PropTypes.arrayOf(React.PropTypes.string)
}