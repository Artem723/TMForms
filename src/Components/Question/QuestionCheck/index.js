import React, { Component } from "react"
import "../Question.css"

export default class QuestionCheck extends Component {
    render() {
        let {possblAns, questionText} = this.props;
        let answers = possblAns.map((el) => {
            return (
                <label>{el}
                    <input type="checkbox" name={el} />
                </label>
            )
        });
        return (
            <div className="Question">
                <div>questionText</div>
                <div>answers</div>
            </div>
        )
    }
}

React.propTypes = {
    questionText: React.PropTypes.string.isRequired,
    possblAns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
}