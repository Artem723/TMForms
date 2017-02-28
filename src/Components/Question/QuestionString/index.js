import React, { Component } from "react"

export default class QuestionString extends Component {
    render() {
        const questionText = this.props.questionText;
        return (
            <div>
                {questionText}{"\n"}
                <input type="text"/>
            </div>
        )
    }
}

React.propTypes = {
    questionText: React.PropTypes.string.isRequired
}