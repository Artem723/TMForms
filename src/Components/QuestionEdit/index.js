import React, { Component } from "react"
import "./QuestionEdit.css"

export default class QuestionEdit extends Component {

    render() {
        const {
            questionText,
            possblAns,
            type,
            onChangeAnswer,
            onChangeQuestionText,
            onAddAnswer,
            onDeleteAnswer,
            onChangeType,
            onDeleteQuestion,
            onCopyQuestion,
            onBlurAnswer,
            onBlurQuestionText,
            numOfQuestions
        } = this.props;
        let answers;
        let addAnswerButton;
        if (type === "string") {
            answers = (
                <label className="questionEdit-answer">
                    <input type="text" value="user answer" /*DELETE LATER*/ /*onChange={()=>{}}*/ readOnly /*DELETE LATER*/ /> {/*onChange callback added  to remove the warning*/}
                </label>
            )
            addAnswerButton = null;
        } else {
            const length = possblAns.length;
            answers = possblAns.map((el, ind, arr) => {
                const inputType = (type === "check") ? "checkbox" : "radio";
                const delButton = length > 1 ? <button onClick={onDeleteAnswer(ind)}>x</button> : null;
                return (
                    <label className="questionEdit-answer" key={ind}>
                        <input type={inputType} checked={false} />
                        <input type="text" value={el} onChange={onChangeAnswer(ind)} onBlur={onBlurAnswer(ind)} />
                        {delButton}
                    </label>
                )
            });
            addAnswerButton = (length < 15) ? <button onClick={onAddAnswer}>Add</button> : null;
        }
        const delQuestionButton = numOfQuestions >1 ? <button onClick={onDeleteQuestion}>delete</button> : null;
        return (
            <div className="questionEdit-container">
                <div className="questionEdit-content">
                    <input type="text" value={questionText} onChange={onChangeQuestionText} onBlur={onBlurQuestionText} />
                    {answers}
                    {addAnswerButton}
                </div>
                <div className="questionEdit-settings">
                    <select value={type} onChange={onChangeType}>
                        <option value="string">plain text</option>
                        <option value="check">checkbox</option>
                        <option value="radio">radio button</option>
                    </select>
                    <button onClick={onCopyQuestion}>copy</button>{" "}
                    {delQuestionButton}
                </div>
            </div>
        )
    }
}

QuestionEdit.propTypes = {
    questionText: React.PropTypes.string.isRequired,
    possblAns: React.PropTypes.array.isRequired,
    type: React.PropTypes.oneOf(["radio", "string", "check"]).isRequired,
    numOfQuestions: React.PropTypes.number,
    onChangeAnswer: React.PropTypes.func.isRequired,
    onChangeQuestionText: React.PropTypes.func.isRequired,
    onAddAnswer: React.PropTypes.func.isRequired,
    onDeleteAnswer: React.PropTypes.func.isRequired,
    onChangeType: React.PropTypes.func.isRequired,
    onDeleteQuestion: React.PropTypes.func.isRequired,
    onCopyQuestion: React.PropTypes.func.isRequired,
    onBlurQuestionText: React.PropTypes.func.isRequired,
    onBlurAnswer: React.PropTypes.func.isRequired,

}