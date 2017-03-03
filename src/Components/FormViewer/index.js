import React, { Component } from "react"
import Question from "../Question"
import "./FormViewer.css"

export default class FormViewer extends Component {
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
                    "possblAns": [],
                    "answers": ""
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
                    ],
                    "answers": ""
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
                    ],
                    "answers": []
                }
            ],
            "isSended": false


        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSendHandler = this.onSendHandler.bind(this);
    }
    onChangeHandler(indOfQestion, e) {
        const questions = this.state.questions.slice();
        const question = questions[indOfQestion];
        //if not found - escape from function
        if (!question) return;
        const target = e.target;
        const value = (target.type === 'checkbox' || target.type === 'radio') ? target.name : target.value;
        //console.log(id + "   " + value + "  ");
        switch (question.type) {
            case "string": question.answers = value; break;
            case "check":
                if (target.checked) {
                    question.answers.push(value);
                } else {
                    //delete value from answers
                    const i = question.answers.indexOf(value);
                    question.answers.splice(i, 1);
                }
                break;
            case "radio": question.answers = value; break;
        }
        questions[indOfQestion] = question;
        this.setState({
            questions
        });
    }
    componentDidMount() {
        //TODO fetch data from server
    }
    onSendHandler() {
        //TODO send data and show empty 
    }
    render() {

        const { title, description, questions, isSended } = this.state;
        let body;
        if (isSended) {
            body = (
                <div>
                    The form is sended.<br />
                    Thank you.
                </div>
            )
        } else {
            const questionList = questions.map((el, ind) => {
                return <Question questionText={el.questionText}
                    type={el.type} possblAns={el.possblAns} key={el._id} answers={el.answers}
                    onChange={(e) => this.onChangeHandler(ind, e)} />
            });
            body = (
                <div className="FormViewer-container">
                    <h1>{title}</h1>
                    <div>{description}</div>
                    <hr />
                    <div>{questionList}</div>
                    <button onClick={this.onSendHandler}>Send</button>
                </div>
            )
        }
        console.log(body);
        return body;
    }
}