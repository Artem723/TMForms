import React, { Component } from "react"
import "../Question.css"

export default class QuestionRadio extends Component {
    render() {
        const {possblAns, questionText, answers, onChange} = this.props;
        const answersList = possblAns.map((el, ind) => {
            return (
                <label key={ind}>
                    <input type="radio" name={el} checked={el === answers} onChange={onChange}/>
                    {el}
                </label>
            )
        });
        return (
            <form className="Question">
                <div>{questionText}</div>
                <div>{answersList}</div>
            </form>
        )
    }
}

React.propTypes = {
    questionText: React.PropTypes.string.isRequired,
    possblAns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    answers: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
}