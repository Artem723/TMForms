import React, { Component } from "react"
import FieldGroup from "../FieldGroup"
import SelectGroup from "../SelectGroup"
import {
    Button,
    FormGroup,
    InputGroup,
    FormControl,
    ButtonGroup,
    Glyphicon
} from "react-bootstrap"
import "./QuestionEdit.css"

export default class QuestionEdit extends Component {
    shouldComponentUpdate(nextProps) {
        const {questionText, possblAns, type, numOfQuestions} = this.props;
        if(
            nextProps.questionText === questionText && 
            nextProps.possblAns===possblAns && 
            nextProps.type === type && 
            nextProps.numOfQuestions === numOfQuestions
        )
            return false;
        else 
            return true;
    }
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
            numOfQuestions,
            onFocus
        } = this.props;
        let answers;
        let addAnswerButton;
        if (type === "string") {
            answers = null;
            addAnswerButton = null;
        } else {
            const length = possblAns.length;
            answers = possblAns.map((el, ind, arr) => {
                const inputType = (type === "check") ? "checkbox" : "radio";
                //const delButton = length > 1 ? <button onClick={onDeleteAnswer(ind)}>x</button> : null;
                let delButton = null;
                if (length > 1)
                    delButton = (
                        <InputGroup.Button>
                            <Button onClick={onDeleteAnswer(ind)}><i className="fa fa-remove"></i></Button>
                        </InputGroup.Button>
                    )
                return (
                    //answers
                    <FormGroup key={ind}>
                        <InputGroup>
                            <InputGroup.Addon>
                                <input type={inputType} checked={false} readOnly />
                            </InputGroup.Addon>
                            <FormControl type="text" value={el} onChange={onChangeAnswer(ind)} onBlur={onBlurAnswer(ind)} onFocus={onFocus} />
                            {delButton}
                        </InputGroup>
                    </FormGroup>
                )
            });
            addAnswerButton = (length < 15) ? <Button bsStyle="primary" onClick={onAddAnswer}><Glyphicon glyph="plus" /></Button> : null;
        }

        return (
            <div className="questionEdit-container">
                <div className="questionEdit-content">
                    <FieldGroup label="" componentClass="textarea" value={questionText} onChange={onChangeQuestionText} onBlur={onBlurQuestionText} onFocus={onFocus} />
                    {answers}
                    {addAnswerButton}
                </div>
                <div className="questionEdit-settings">
                    <SelectGroup value={type} label="type:" onChange={onChangeType} optionsValues={["string","check","radio"]} optionsText={["plain text","checkbox","radio button"]}/>
                    <ButtonGroup >
                        {numOfQuestions < 50 ? <Button bsStyle="primary" onClick={onCopyQuestion}>copy <i className="fa fa-copy fa-lg"></i></Button> : null}
                        {numOfQuestions > 1  ? <Button bsStyle="primary" onClick={onDeleteQuestion}>delete <Glyphicon glyph="trash" /></Button> : null}
                    </ButtonGroup>
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
    onFocus: React.PropTypes.func.isRequired

}