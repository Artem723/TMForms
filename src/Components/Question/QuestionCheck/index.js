import React, { Component } from "react"
import "../Question.css"

export default class QuestionCheck extends Component {
    render() {
        const {possblAns, questionText, answers, onChange} = this.props;
        const answersList = possblAns.map((el, ind) => {
            return (
                <label key={ind}>
                    <input type="checkbox" name={el} checked={answers.indexOf(el)!==-1} onChange={onChange}/>
                    {el}
                </label>
            )
        });
        return (
            <div className="Question">
                <div>{questionText}</div>
                <div>{answersList}</div>
            </div>
        )
    }
}

React.propTypes = {
    questionText: React.PropTypes.string.isRequired,
    possblAns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    answers: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onChange: React.PropTypes.func.isRequired
}