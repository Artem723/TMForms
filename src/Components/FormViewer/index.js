import React, { Component } from "react"
import Question from "../Question"
import "./FormViewer.css"
const form = {
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
export default class FormViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            questions: [],
            isSended: false,
            IsClosed: false,
            hasResponseObtained: false

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
            default: ;
        }
        questions[indOfQestion] = question;
        this.setState({
            questions
        });
    }
    componentDidMount() {
        const formId = this.props.params.id;
        let status;
        fetch(`/api/forms/${formId}`)
            .then((response) => {
                status = response.status;
                console.log(status);
                if (status === 403) {
                    this.setState({
                        IsClosed: true
                    })
                } else if (status === 404) {
                    alert("form not found");
                } else return response.json();
            })
            .then((body) => {
                if (status === 200) {
                    const { title, description, questions } = body;
                    const questionList = questions.map((el) => {
                        return { ...el, answers: [] }
                    });
                    this.setState({
                        title,
                        description,
                        questions: questionList,
                        hasResponseObtained: true
                    });
                } else {
                    alert(body.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    onSendHandler() {
        const headers = {
            "Content-Type": "application/json"
        }
        const body = this.state.questions.map((el) => {
            return {
                id: el._id,
                answers: el.answers
            }
        });
        const option = {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }
        const formId = this.props.params.id;
        let status;
        fetch(`/api/forms/${formId}`, option)
            .then((response) => {
                status = response.status;
                if (status === 403) {
                    this.setState({
                        IsClosed: true
                    })
                } else if (status === 404) {
                    alert("form not found");
                } else if (status === 200) {
                    this.setState({
                        isSended: true
                    });
                } else return response.json();
            })
            .then((body) => {
                alert(body.message);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    render() {

        const { title, description, questions, isSended, IsClosed, hasResponseObtained } = this.state;
        let body;
        if (!hasResponseObtained) {
            body = (
                <div className="Spinner">
                    Loading...
                </div>
            )
        } else if (IsClosed) {
            body = (
                <div>
                    Sorry, form is closed.
                </div>
            )
        } else if (isSended) {
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
        //console.log(body);
        return body;
    }
}