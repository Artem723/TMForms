import React, { Component } from "react"
import ResultBlock from "../ResultBlock"
import "./Results.css"

const data = [
    {
        id: 0,
        type: "check",
        questionText: "What fruit do you like?",
        answers: {
            Apple: 30,
            Lemon: 20,
            Melon: 45,
            Mango: 15
        }
    },
    {
        id: 1,
        type: "radio",
        questionText: "What fruit do you like?",
        answers: {
            Apple: 30,
            Lemon: 20,
            Melon: 45,
            Mango: 15,
            Apple1: 30,
            Lemon1: 20,
            Melon1: 45,
            Mango1: 15
        }
    },
    {
        id: 2,
        type: "string",
        questionText: "What fruit do you like?",
        answers: ["Apple", "Lemon", "Melon", "Mango"]
    }
];
export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            hasResponseObtained: false
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
        let status;
        const formId = this.props.params.id;
        fetch(`/api/results/forms/${formId}`, option)
            .then((response) => {
                status = response.status;
                this.setState({
                    hasResponseObtained: false
                });
                if(status === 401) this.props.routes.replace("/login");
                else if(status === 404) alert("not found");
                else if(status === 403) alert("permission denied");
                else return response.json();
            })
            .then((body) => {
                if (status !== 200) {
                    const message = body && body.message;
                    alert("Something goes wrong. Status " + status + ". Message: " + message);
                } else {
                    let forms = body;
                    this.setState({
                        data: body
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    onEditHandler() {
        this.props.router.replace("/forms/" + this.props.params.id + "/edit");
    }
    render() {
        const data = this.state.data;
        const resBlocks = data.map((el) => {
            //const {type, id, question, possblAns, usersAns} = el;
            return <ResultBlock {...el} key={el.id} />
        })
        return (
            <div className="Results-container">
                <button onClick={this.onEditHandler}>Edit</button>
                {resBlocks}
            </div>
        )
    }
}