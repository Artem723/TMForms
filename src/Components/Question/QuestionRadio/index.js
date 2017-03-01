import React, { Component } from "react"
import "../Question.css"

export default class QuestionRadio extends Component {
    render() {
        let {possblAns, questionText} = this.props;
        let answers = possblAns.map((el) => {
            return (
                <label>
                    <input type="radio" name={el} />
                    {el}
                </label>
            )
        });
        return (
            <form className="Question">
                <div>{questionText}</div>
                <div>{answers}</div>
            </form>
        )
    }
}

React.propTypes = {
    questionText: React.PropTypes.string.isRequired,
    possblAns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
}