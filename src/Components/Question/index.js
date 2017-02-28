import React, { Component } from "react"
import QuestionCheck from "./QuestionCheck"
import QuestionRadio from "./QuestionRadio"
import QuestionString from "./QuestionString"

export default class Question extends Component {
    render() {
        let {possblAns, questionText, type} = this.props;
        let question;
        switch(type) {
            case "radio": question = <QuestionRadio questionText={questionText} possblAns={possblAns}/>; break;
            case "check": question = <QuestionCheck questionText={questionText} possblAns={possblAns}/>; break;
            case "string": question = <QuestionString questionText={questionText}/>;break;
            default:
                question = null;
        }        
        return question;
        
    }
}

React.propTypes = {
    questionText: React.PropTypes.string.isRequired,
    possblAns: React.PropTypes.array.isRequired,
    type: React.PropTypes.oneOf(["radio", "string", "check"]).isRequired
}