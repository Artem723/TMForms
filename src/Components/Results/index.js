import React, { Component } from "react"
import ResultBlock from "../ResultBlock"

const data = [
    {
        id: 0,
        type: "radio",
        question: "What fruit do you like?",
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
        type: "check",
        question: "What fruit do you like?",
        possblAns: ["Apple", "Lemon", "Melon", "Mango"],
        usersAns: {
            Apple: 30,
            Lemon: 20,
            Melon: 45,
            Mango: 15
        }
    },
    {
        id: 2,
        type: "string",
        question: "What fruit do you like?",
        possblAns: [],
        usersAns: ["Apple", "Lemon", "Melon", "Mango"]
    }
];
export default class Results extends Component {
    render() {
        const resBlocks = data.map((el) => {
            //const {type, id, question, possblAns, usersAns} = el;
            return <ResultBlock {...el} key={el.id}/>
        })
        return (
            <div className="Results">
                {resBlocks}
            </div>
        )
    }
}