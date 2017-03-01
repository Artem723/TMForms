import React, { Component } from "react"
import "../Question.css"

export default class QuestionString extends Component {
    render() {
        const questionText = this.props.questionText;
        return (
            <div className="Question">
                <div>{questionText}</div>
                <input type="text"/>
            </div>
        )
    }
}

React.propTypes = {
    questionText: React.PropTypes.string.isRequired
}