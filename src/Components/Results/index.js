import React, { Component } from "react"
import ResultBlock from "../ResultBlock"
import "./Results.css"

const data = [
    {
        id: 0,
        type: "check",
        questionText: "What fruit do you like?",
        possblAns: ["Apple", "Lemon", "Melon", "Mango"],
        usersAns: {
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
        possblAns: ["Apple", "Lemon", "Melon", "Mango", "Apple1", "Lemon1", "Melon1", "Mango1"],
        usersAns: {
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
        possblAns: [],
        usersAns: ["Apple", "Lemon", "Melon", "Mango"]
    }
];
export default class Results extends Component {
    constructor(props) {
        super(props);
        this.onEdit = this.onEdit.bind(this);
    }
    onEdit() {
        this.props.router.replace("/forms/" + this.props.params.id + "/edit");
    }
    render() {
        const resBlocks = data.map((el) => {
            //const {type, id, question, possblAns, usersAns} = el;
            return <ResultBlock {...el} key={el.id} />
        })
        return (
            <div className="Results-container">
                <button onClick={this.onEdit}>Edit</button>
                {resBlocks}
            </div>
        )
    }
}