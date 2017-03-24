import React, { Component } from "react"
import QuestionEdit from "../QuestionEdit"
import { Col, Row, Button, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link } from "react-router"
import FieldGroup from "../FieldGroup"
import Switcher from "../Switcher"
import "./Editor.css"
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
//             "possblAns": []
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
//             ]
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
//             ]
//         }
//     ]
// }
export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            isOpen: true,
            questions: [],
            isLoading: false
        }
        this.onIsOpenChange = this.onIsOpenChange.bind(this);
        this.onChangeByName = this.onChangeByName.bind(this);
        this.onBlurInputByName = this.onBlurInputByName.bind(this);
        this.onSaveHandler = this.onSaveHandler.bind(this);
        this.onChangeAnswer = this.onChangeAnswer.bind(this);
        this.onChangeQuestionText = this.onChangeQuestionText.bind(this);
        this.onAddAnswer = this.onAddAnswer.bind(this);
        this.onDeleteAnswer = this.onDeleteAnswer.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onDeleteQuestion = this.onDeleteQuestion.bind(this);
        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onResultsHandler = this.onResultsHandler.bind(this);
        this.onBlurAnswer = this.onBlurAnswer.bind(this);
        this.onBlurQuestionText = this.onBlurQuestionText.bind(this);
    }
    componentDidMount() {
        const formId = this.props.params.id;
        if (formId === "new-form") {
            //create new form
            this.setState({
                title: "Form title",
                description: "Form description",
                isOpen: true,
                questions: [
                    {
                        questionText: "Question",
                        type: "check",
                        __key: Date.now(),
                        possblAns: ["Answer 1"]
                    }
                ]
            })
        } else {
            //load form from server
            this.setState({
                isLoading: true
            })
            const headers = {
                "Authorization": `Bearer ${this.props.token}`
            }
            const option = {
                method: "GET",
                headers
            }
            let status;
            fetch(`/api/forms/${formId}`, option)
                .then((response) => {
                    this.setState({
                        isLoading: false
                    })
                    status = response.status;
                    if (status === 200)
                        return response.json();
                    else if (status === 500)
                        alert("internal server Error");
                    else if (status === 404)
                        alert("Form not found!");
                    else if (status === 403)
                        alert("Permission denied");
                    else if (status === 401) {
                        alert("Wrong token");
                        this.props.onLogOutHandler();
                    }
                })
                .then((body) => {
                    const { title, description, isOpen, questions } = body;
                    this.setState({
                        title,
                        description,
                        isOpen,
                        questions
                    });
                })
                .catch((err) => {
                    throw err;
                })
        }
    }
    onIsOpenChange(e) {
        this.setState({
            isOpen: e.target.checked
        })
    }
    onChangeByName(e) {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }
    onBlurInputByName(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        if (!value) {
            let newVal = "";
            switch (name) {
                case "title": newVal = "Form title"; break;
                case "description": newVal = "Description"; break;
            }
            this.setState({
                [name]: newVal
            })
        }

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
        let method, path;
        const formId = this.props.params.id;
        if (formId === "new-form") {
            //for new form
            method = "POST";
            path = "/api/forms"
        } else {
            //for udate existing form
            method = "PUT";
            path = `/api/forms/${formId}`;
        }
        const { title, description, isOpen } = this.state;
        //clean __key field if it exists
        const questions = this.state.questions.map((q) => {
            if (q.__key) {
                return { ...q, __key: undefined };
            } else {
                return q;
            }
        });
        const body = {
            title,
            description,
            isOpen,
            questions
        }
        const headers = {
            "Authorization": `Bearer ${this.props.token}`,
            "Content-Type": "Application/json"
        }
        const option = {
            method,
            headers,
            body: JSON.stringify(body)
        }
        fetch(path, option)
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    if (formId === "new-form") {
                        let locationHeader = response.headers.get("Location");
                        const id = locationHeader.split("/").pop();
                        this.props.router.replace("/forms/" + id + "/edit");
                    } else {
                        console.log("====================SAVED==========================");
                    }
                } else if (status === 500)
                    alert("internal server Error");
                else if (status === 404)
                    alert("Form not found!");
                else if (status === 403)
                    alert("Permission denied");
                else if (status === 401) {
                    alert("Wrong token");
                    this.ptops.onLogOutHandler();
                }
            })
            .catch((err) => {
                throw err;
            })

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
    onResultsHandler() {
        this.props.router.replace("/forms/" + this.props.params.id + "/results");
    }


    render() {
        console.log("===================== RENDER =========================");
        const { questions, title, description, isLoading, isOpen } = this.state;
        const numOfQuestions = questions.length;
        const questionList = questions.map((el, indOfQuestion) => {
            const { _id, possblAns, type, questionText, __key } = el;
            return (
                <ListGroupItem key={_id || __key}>
                    <QuestionEdit type={type} possblAns={possblAns} questionText={questionText}
                        numOfQuestions={numOfQuestions}
                        onChangeAnswer={(indOfAnswer) => (e) => this.onChangeAnswer(e, indOfQuestion, indOfAnswer)}
                        onChangeQuestionText={(e) => this.onChangeQuestionText(e, indOfQuestion)}
                        onAddAnswer={() => this.onAddAnswer(indOfQuestion)}
                        onDeleteAnswer={(indOfAnswer) => (e) => this.onDeleteAnswer(indOfQuestion, indOfAnswer)}
                        onChangeType={(e) => this.onChangeType(e, indOfQuestion)}
                        onDeleteQuestion={() => this.onDeleteQuestion(indOfQuestion)}
                        onCopyQuestion={() => this.onCopyQuestion(indOfQuestion)}
                        onBlurQuestionText={(e) => this.onBlurQuestionText(e, indOfQuestion)}
                        onBlurAnswer={(indOfAnswer) => (e) => this.onBlurAnswer(e, indOfQuestion, indOfAnswer)} />
                </ListGroupItem>
            )
        })
        const formId = this.props.params.id;
        let linkComp;
        //if form is new, _id contains null value
        if (formId !== "new-form") {
            const link = "http://localhost:3000/forms/" + formId;
            linkComp = (
                <div className="Editor-link">
                    <div>Link:</div>
                    <Link to={link}>{link}</Link>
                </div>
            );
        } else {
            linkComp = <div className="msg-text">Save the form, when it has been saved you can pass it</div>;
        }
        const titleProps = {
            label: "",
            rows: 1,
            className: "title-textarea",
            name: "title",
            type: "text",
            value: title,
            onChange: this.onChangeByName,
            onBlur: this.onBlurInputByName
        }
        const descriptionProps = {
            label: "",
            rows: 1,
            componentClass: "textarea",
            name: "description",
            value: description,
            onChange: this.onChangeByName,
            onBlur: this.onBlurInputByName
        }
        const textSwitcher = isOpen ? "Answers are accepted" : "Answers aren't accepted";
        const spinner = <div className="Spinner" />;
        const body = (
            <section className="Editor animated">
                <Row>
                    <Col md={2} lgOffset={1}>
                        <aside className="fixed">
                            <Button block bsStyle="primary" onClick={this.onResultsHandler}>Results</Button>
                            <Button block bsStyle="primary" onClick={this.onSaveHandler}>Save</Button>
                        </aside>
                    </Col>
                    <Col sm={10} smOffset={1} md={8} mdOffset={0} lg={6} >
                        <header >
                            <Switcher text={textSwitcher} checked={isOpen} onChange={this.onIsOpenChange} />
                            {/*<FieldGroup.Static className="Editor-link" label="Link:" value={link}/>*/}
                            {linkComp}
                        </header>
                        <main>
                            <form>
                                <FieldGroup {...titleProps} />
                                <FieldGroup {...descriptionProps} />
                                <ListGroup>
                                    {questionList}
                                </ListGroup>
                            </form>
                        </main>
                        <footer>
                            <Button block bsStyle="primary" onClick={this.onAddQuestion}>Add</Button>
                        </footer>
                    </Col>
                </Row>
            </section>
        )
        return (
            isLoading ? spinner : body
        )
    }
}

Editor.propTypes = {
    token: React.PropTypes.string.isRequired
}