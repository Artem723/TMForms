import React, { Component } from "react"
import Question from "../Question"
import { Col, Button, ListGroup, ListGroupItem } from "react-bootstrap"
import AlertBlock from "../AlertBlock"
import "./FormViewer.css"
// const form = {
//     "_id": "58a6e353702e7410f4a33ee2",
//     "title": "The best title",
//     "description": "The best description",
//     "isOpen": true,
//     "questions": [
//         {
//             "questionText": "How are youTest?",
//             "type": "string",
//             "_id": "58a6e8ff9070be11bc9466b1",
//             "possblAns": [],
//             "answers": ""
//         },
//         {
//             "questionText": "Where are you from?",
//             "type": "radio",
//             "_id": "58a6e8ff9070be11bc9466b2",
//             "possblAns": [
//                 "Brest",
//                 "Minsk",
//                 "Grodno",
//                 "Amsterdam"
//             ],
//             "answers": ""
//         },
//         {
//             "questionText": "Where are you from?",
//             "type": "check",
//             "_id": "58a6e8ff9070be11bc9466b3",
//             "possblAns": [
//                 "Brest",
//                 "Minsk",
//                 "Grodno",
//                 "Amsterdam"
//             ],
//             "answers": []
//         }
//     ],
//     "isSended": false
// };
export default class FormViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            questions: [],
            isSended: false,
            IsClosed: false,
            hasResponseObtained: false,
            showErrorAlert: false
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSendHandler = this.onSendHandler.bind(this);
        this.onHideErrorAlertonHide = this.onHideErrorAlertonHide.bind(this);
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
                if (status === 403) {
                    this.setState({
                        IsClosed: true,
                        hasResponseObtained: true
                    })
                } else if (status === 404) {
                    this.props.router.replace("/not-found");
                } else if (status >= 500) {
                    this.setState({
                        showErrorAlert: true,
                        hasResponseObtained: true
                    })
                } else if (status === 200)
                    return response.json();
                
            })
            .then((body) => {
                if(!body) return;
                const { title, description, questions } = body;
                const questionList = questions.map((el) => {
                    return { 
                        ...el, 
                        answers: el.type === "string" ? "" : [] 
                    }
                });
                this.setState({
                    title,
                    description,
                    questions: questionList,
                    hasResponseObtained: true
                });
            })
            .catch((err) => {
                throw err;
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
                    this.props.router.replace("/not-found");
                } else if (status >= 500) {
                    this.setState({
                        showErrorAlert: true
                    });
                } else if (status === 200) {
                    this.setState({
                        isSended: true
                    });
                }
            })
            .catch((err) => {
                throw err;
            })
    }

    onHideErrorAlertonHide() {
        this.setState({
            showErrorAlert: false
        })
    }
    render() {

        const { title, description, questions, isSended, IsClosed, hasResponseObtained } = this.state;
        let body;
        const alertProps = {
            bsStyle: "danger",
            header: "Oh, something went wrong!",
            main: "We've got server issue. We try to do everything so that it does not happen again",
            onDismiss: this.onHideErrorAlertonHide
        }
        const errAlert = <AlertBlock className="absolute" {...alertProps} />;
        if (!hasResponseObtained) {
            body = (
                <div className="Spinner"></div>
            )
        } else if (IsClosed) {
            body = (
                <section className="info-message">
                    Sorry, form is closed.
                </section>
            )
        } else if (isSended) {
            body = (
                <section className="info-message">
                    The form is sended.<br />
                    Thank you.
                </section>
            )
        } else {
            const questionList = questions.map((el, ind) => {
                return (
                    <ListGroupItem key={el._id}>
                        <Question questionText={el.questionText}
                            type={el.type} possblAns={el.possblAns} answers={el.answers}
                            onChange={(e) => this.onChangeHandler(ind, e)} />
                    </ListGroupItem>
                )
            });
            body = (
                <section className="FormViewer">
                    <Col sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3} className="animated">
                        <header>
                            {this.state.showErrorAlert && errAlert}
                            <h1>{title}</h1>
                            <div className="lead">{description}</div>
                        </header>
                        <main>
                            <ListGroup>
                                {questionList}
                            </ListGroup>
                        </main>
                        <footer>
                            {/*If we haven't got questions then we hide button*/}
                            {!!questionList.length && <Button block bsStyle="primary" onClick={this.onSendHandler}>Send</Button>}
                        </footer>
                    </Col>
                </section>
            )
        }
        return body;
    }
}