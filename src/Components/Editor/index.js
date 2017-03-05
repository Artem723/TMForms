import React, { Component } from "react"
import QuestionEdit from "../QuestionEdit"
import "./Editor.css"

export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "_id": "58a6e353702e7410f4a33ee2",
            "title": "The best title",
            "description": "The best description",
            "isOpen": true,
            "questions": [
                {
                    "questionText": "How are youTest?",
                    "type": "string",
                    "_id": "58a6e8ff9070be11bc9466b1",
                    "possblAns": []
                },
                {
                    "questionText": "Where are you from?",
                    "type": "radio",
                    "_id": "58a6e8ff9070be11bc9466b2",
                    "possblAns": [
                        "Brest",
                        "Minsk",
                        "Grodno",
                        "Amsterdam"
                    ]
                },
                {
                    "questionText": "Where are you from?",
                    "type": "check",
                    "_id": "58a6e8ff9070be11bc9466b3",
                    "possblAns": [
                        "Brest",
                        "Minsk",
                        "Grodno",
                        "Amsterdam"
                    ]
                }
            ],
            deleted: []
        }
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onSaveHandler = this.onSaveHandler.bind(this);
        this.onChangeAnswer = this.onChangeAnswer.bind(this);
        this.onChangeQuestionText = this.onChangeQuestionText.bind(this);
        this.onAddAnswer = this.onAddAnswer.bind(this);
        this.onDeleteAnswer = this.onDeleteAnswer.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onDeleteQuestion = this.onDeleteQuestion.bind(this);
        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onResults = this.onResults.bind(this);
        this.onBlurAnswer = this.onBlurAnswer.bind(this);
        this.onBlurQuestionText = this.onBlurQuestionText.bind(this);
    }
    componentDidmount() {
       
    }

    onChangeTitle(e) {

    }
    onChangeDescription(e) {

    }
    onBlurAnswer(e, indOfQuestion, indOfAnswer) {
        const value = e.target.value;
        if (!value)
            this.setState((prevState) => {
                const questions = prevState.questions.slice();
                const possblAns = questions[indOfQuestion].possblAns;
                possblAns[indOfAnswer] = `answer ${indOfAnswer + 1}`;
                return {
                    questions
                };
            })
    }
    onBlurQuestionText(e, indOfQuestion) {
        const value = e.target.value;
        if (!value)
            this.setState((prevState) => {
                const questions = prevState.questions.slice();
                questions[indOfQuestion].questionText = `Question ${indOfQuestion + 1}`;
                return {
                    questions
                };
            })
    }

    onChangeAnswer(e, indOfQuestion, indOfAnswer) {
        let value = e.target.value;
        this.setState((prevState) => {
            const questions = prevState.questions.slice();
            const possblAns = questions[indOfQuestion].possblAns;
            //if value string is empty, assign sample
            //value = value || `answer ${indOfAnswer + 1}`;
            possblAns[indOfAnswer] = value;
            return {
                questions
            };
        })
    }
    onChangeQuestionText(e, indOfQuestion) {
        let value = e.target.value;
        this.setState((prevState) => {
            const questions = prevState.questions.slice();
            //if value string is empty, assign sample
            //value = value || "Question";
            questions[indOfQuestion].questionText = value;
            return {
                questions
            };
        })
    }
    onAddAnswer(indOfQuestion) {
        this.setState((prevState) => {
            const questions = prevState.questions.slice();
            const possblAns = questions[indOfQuestion].possblAns;
            possblAns.push(`answer ${possblAns.length + 1}`);
            return {
                questions
            };
        })
    }
    onDeleteAnswer(indOfQuestion, indOfAnswer) {
        this.setState((prevState) => {
            const questions = prevState.questions.slice();
            const possblAns = questions[indOfQuestion].possblAns;
            possblAns.splice(indOfAnswer, 1);
            return {
                questions
            };
        })
    }
    onChangeType(e, indOfQuestion) {
        const value = e.target.value;
        this.setState((prevState) => {
            const questions = prevState.questions.slice();
            const currType = questions[indOfQuestion].type;
            if (value === "string" || currType === "string") {
                //Delete question and create new empty
                const questionText = questions[indOfQuestion].questionText;
                const possblAns = value !== "string" ? ["answer 1"] : [];
                const newQuestion = {
                    __key: Date.now(),
                    type: value,
                    questionText: questionText,
                    possblAns: possblAns
                }
                questions.splice(indOfQuestion, 1, newQuestion);
            } else {
                questions[indOfQuestion].type = value;
            }
            return {
                questions
            };
        })
    }
    onDeleteQuestion(indOfQuestion) {
        this.setState((prevState) => {
            const questions = prevState.questions.slice();
            questions.splice(indOfQuestion, 1);
            return {
                questions
            };
        })
    }
    onAddQuestion() {
        this.setState((prevState) => {
            const questions = prevState.questions.slice();
            const newQuestion = {
                __key: Date.now(),
                type: "check",
                questionText: `Question ${questions.length + 1}`,
                possblAns: ["answer 1"]
            }
            questions.push(newQuestion);
            return {
                questions
            };
        })
    }

    onSaveHandler() {
        //this.props.router.replace("/forms/blabla/edit");

    }
    onCopyQuestion(indOfQuestion) {
        this.setState((prevState) => {
            const questions = prevState.questions.slice();
            const source = questions[indOfQuestion];
            const newQuestion = {
                __key: Date.now(),
                type: source.type,
                questionText: source.questionText,
                possblAns: source.possblAns
            }
            questions.push(newQuestion);
            return {
                questions
            };
        })
    }
    onResults() {
        this.props.router.replace("/forms/" + this.props.params.id + "/results");
    }


    render() {
        const { questions, title, description, _id } = this.state;
        const questionList = questions.map((el, indOfQuestion) => {
            const { _id, possblAns, type, questionText, __key } = el;
            return <QuestionEdit key={_id || __key} type={type} possblAns={possblAns} questionText={questionText}
                onChangeAnswer={(indOfAnswer) => (e) => this.onChangeAnswer(e, indOfQuestion, indOfAnswer)}
                onChangeQuestionText={(e) => this.onChangeQuestionText(e, indOfQuestion)}
                onAddAnswer={() => this.onAddAnswer(indOfQuestion)}
                onDeleteAnswer={(indOfAnswer) => (e) => this.onDeleteAnswer(indOfQuestion, indOfAnswer)}
                onChangeType={(e) => this.onChangeType(e, indOfQuestion)}
                onDeleteQuestion={() => this.onDeleteQuestion(indOfQuestion)}
                onCopyQuestion={() => this.onCopyQuestion(indOfQuestion)} 
                onBlurQuestionText={(e) => this.onBlurQuestionText(e, indOfQuestion)}
                onBlurAnswer={(indOfAnswer) => (e) => this.onBlurAnswer(e, indOfQuestion, indOfAnswer)} />


        })
        console.log("===================== RENDER =========================");
        return (
            <div className="Editor">
                <div className="Editor-link">
                    <div>
                        Link:
                    </div>
                    <div>
                        {"http://localhost:3000/forms/" + _id}
                    </div>
                </div>
                <h1>{title}</h1>
                <div>{description}</div>
                <button onClick={this.onResults}>Results</button>{" "}<button onClick={this.onSaveHandler}>Save</button>
                {questionList}
                <button onClick={this.onAddQuestion}>Add</button>
            </div>
        )
    }
}

Editor.propTypes = {
    token: React.PropTypes.string.isRequired
}