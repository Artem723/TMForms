import React, { Component } from "react"
import { FormGroup, ControlLabel, Radio } from "react-bootstrap"
import "../Question.css"

export default class QuestionRadio extends Component {
    render() {
        const {possblAns, questionText, answers, onChange} = this.props;
        const answersList = possblAns.map((el, ind) => {
            return (
                <Radio key={ind} name={el} checked={el === answers} onChange={onChange}>
                    {el}
                </Radio>
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
    answers: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
}