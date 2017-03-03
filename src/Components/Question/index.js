import React, { Component } from "react"
import QuestionCheck from "./QuestionCheck"
import QuestionRadio from "./QuestionRadio"
import QuestionString from "./QuestionString"

export default class Question extends Component {
    render() {
        const {possblAns, questionText, type, answers, onChange} = this.props;
        const props = {
            questionText,
            possblAns,
            answers,
            onChange
        }
        let question;
        switch(type) {
            case "radio": question = <QuestionRadio {...props} />; break;
            case "check": question = <QuestionCheck {...props}/>; break;
            case "string": question = <QuestionString {...props}/>;break;
            default:
                question = null;
        }        
        return question;
        
    }
}

React.propTypes = {
    questionText: React.PropTypes.string.isRequired,
    possblAns: React.PropTypes.array.isRequired,
    type: React.PropTypes.oneOf(["radio", "string", "check"]).isRequired,
    answers: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]).isRequired,
    onChange: React.PropTypes.func.isRequired
}