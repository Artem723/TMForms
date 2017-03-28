import React, { Component } from "react"
import ResultBlock from "../ResultBlock"
import { Col, Button } from "react-bootstrap"
import { Link } from "react-router"
import AlertBlock from "../AlertBlock"
import "./Results.css"
// const data = [
//     {
//         id: 0,
//         type: "check",
//         questionText: "What fruit do you like?",
//         answers: {
//             Apple: 30,
//             Lemon: 20,
//             Melon: 45,
//             Mango: 15
//         }
//     },
//     {
//         id: 1,
//         type: "radio",
//         questionText: "What fruit do you like?",
//         answers: {
//             Apple: 30,
//             Lemon: 20,
//             Melon: 45,
//             Mango: 15,
//             Apple1: 30,
//             Lemon1: 20,
//             Melon1: 45,
//             Mango1: 15
//         }
//     },
//     {
//         id: 2,
//         type: "string",
//         questionText: "What fruit do you like?",
//         answers: ["Apple", "Lemon", "Melon", "Mango"]
//     }
// ];
export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            hasResponseObtained: false,
            errorAlertText: null
        }
        this.onHideErrorAlert = this.onHideErrorAlert.bind(this);
    }
    componentDidMount() {
        const headers = {
            "Authorization": `Bearer ${this.props.token}`
        }
        const option = {
            method: "GET",
            headers
        }
        const formId = this.props.params.id;
        fetch(`/api/results/forms/${formId}`, option)
            .then((response) => {
                const status = response.status;
                this.setState({
                    hasResponseObtained: true
                });
                if (status === 401) {
                    this.props.onLogOutHandler();
                }
                else if (status === 404)
                    this.props.router.replace("/not-found");
                else if (status === 403)
                    //permission dinied
                    this.props.onLogOutHandler();
                else if (status >= 500)
                    this.setState({
                        errorAlertText: "Oh, we've got an server issue.  We try to do everything so that it does not happen again."
                    });
                else if (status === 200) {
                    this.setState({
                        errorAlertText: null
                    })
                    return response.json();
                }
                else this.setState({
                    errorAlertText: "Oh, something went wrong."
                });
            })
            .then((body) => {
                if (!body) return;
                this.setState({
                    data: body
                });
            })
            .catch((err) => {
                throw err;
            })
    }
    onHideErrorAlert() {
        this.setState({
            errorAlertText: null
        })
    }
    render() {
        const formId = this.props.params.id;
        const { data, hasResponseObtained, errorAlertText } = this.state;
        const resBlocks = data.map((el) => {
            //const {type, id, question, possblAns, usersAns} = el;
            return <ResultBlock {...el} key={el.id} />
        })
        let body = null;
        if (!hasResponseObtained)
            body = <div className="Spinner" />
        else
            body = (
                <div>
                    {errorAlertText && <AlertBlock bsStyle="danger" main={errorAlertText} onDismiss={this.onHideErrorAlert}/>}
                    <Col sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3} className="animated">
                        <Link className="button-link" to={`/forms/${formId}/edit`}><Button bsStyle="primary" block >Edit</Button></Link>
                        {resBlocks}
                    </Col>
                </div>
            )
        return (
            <section className="Results-container">
                {body}
            </section>
        )
    }
}