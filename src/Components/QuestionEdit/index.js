import React, { Component } from "react"
import "./QuestionEdit.css"

export default class QuestionEdit extends Component {

    render() {
        const {questionText, possblAns, type} = this.props;
        let answers;
        let button;
        if (type === "string") {
            answers = (
                <label className="questionEdit-answer">
                    <input type="text" value=""/>
                </label>
            )
            button = null;
        } else {
            answers = possblAns.map((el) => {
                const inputType = (type === "check") ? "checkbox" : "radio";
                return <label className="questionEdit-answer">
                    <input type={inputType} checked={false} />
                    <input type="text" value={el} />
                </label>
            });
            button = <button>Add</button>;
        }
        return (
            <div className="questionEdit-container">
                <div className="questionEdit-content">
                    <input type="text" value={questionText} />
                    {answers}
                    {button}
                </div>
                <div className="questionEdit-settings">
                    <select value={type}>
                        <option value="string">plain text</option>
                        <option value="check">checkbox</option>
                        <option value="radio">radio button</option>
                    </select>
                    <button>delete</button>
                </div>
            </div>
        )
    }
}
QuestionEdit.propTypes = {
    questionText: React.PropTypes.string.isRequired,
    possblAns: React.PropTypes.array.isRequired,
    type: React.PropTypes.oneOf(["radio", "string", "check"]).isRequired
}