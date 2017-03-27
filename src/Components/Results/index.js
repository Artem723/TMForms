import React, { Component } from "react"
import ResultBlock from "../ResultBlock"
import { Col, Button } from "react-bootstrap"
import { Link } from "react-router"
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
        this.onEditHandler = this.onEditHandler.bind(this);
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
                    hasResponseObtained: false
                });
                if (status === 401) {
                    this.props.onLogOutHandler();
                }
                else if (status === 404) this.props.router.replace("/not-found");
                else if (status === 403) alert("permission denied");
                else if (status >= 500) alert("internal server Error");
                else if (status === 200) return response.json();
                else alert("unknown error")
            })
            .then((body) => {
                this.setState({
                    data: body,
                    hasResponseObtained: true
                });
            })
            .catch((err) => {
                throw err;
            })
    }
    onEditHandler() {
        this.props.router.replace("/forms/" + this.props.params.id + "/edit");
    }
    render() {
        const formId = this.props.params.id;
        const { data, hasResponseObtained } = this.state;
        const resBlocks = data.map((el) => {
            //const {type, id, question, possblAns, usersAns} = el;
            return <ResultBlock {...el} key={el.id} />
        })
        let body = null;
        if (!hasResponseObtained)
            body = <div className="Spinner" />
        else
            body = (
                 <Col sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3} className="animated">
                    <Button bsStyle="primary" block onClick={this.onEditHandler}><Link className="button-link" to={`/form/${formId}/edit`}>Edit</Link></Button>
                    {resBlocks}
                </Col>
            )
        return (
            <section className="Results-container">              
                    {body}
            </section>
        )
    }
}