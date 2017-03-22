import React, { Component } from "react"
import FieldGroup from "../../FieldGroup";
import "../Question.css"

export default class QuestionString extends Component {
    render() {
        const {questionText: label, answers: value, onChange} = this.props;
        const formProps = {
            label,
            value,
            onChange
        }
        return (
            <FieldGroup {...formProps}/>
        )
    }
}

React.propTypes = {
    questionText: React.PropTypes.string.isRequired,
    answers: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
}