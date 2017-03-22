import React, { Component } from "react"
import { Checkbox, FormGroup, ControlLabel } from "react-bootstrap"
import "../Question.css"

export default class QuestionCheck extends Component {
    render() {
        const {possblAns, questionText, answers, onChange} = this.props;
        const answersList = possblAns.map((el, ind) => {
            return (
                <Checkbox key={ind} name={el} checked={answers.indexOf(el)!==-1} onChange={onChange}>
                    {el}
                </Checkbox>
            )
        });
        return (
            <FormGroup>
                 <ControlLabel>{questionText}</ControlLabel>
                 {answersList}
            </FormGroup>
        )
    }
}

React.propTypes = {
    questionText: React.PropTypes.string.isRequired,
    possblAns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    answers: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onChange: React.PropTypes.func.isRequired
}