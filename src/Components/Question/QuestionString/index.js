import React, { Component } from "react"
import "../Question.css"

export default class QuestionString extends Component {
    render() {
        const {questionText, answers, onChange} = this.props;
        return (
            <div className="Question">
                <div>{questionText}</div>
                <input type="text" value={answers} onChange={onChange}/>
            </div>
        )
    }
}

React.propTypes = {
    questionText: React.PropTypes.string.isRequired,
    answers: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
}