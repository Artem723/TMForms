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
        }
    ]

}

export default class FormViewer extends Component {
    render() {
        const questions = form.questions.map((el) => {
            return <Question questionText={el.questionText} 
            type={el.type} possblAns={el.possblAns} key={el._id}/>
        });
        return (
            <div className="FormViewer">
                <h1>{form.title}</h1> 
                <div>{form.description}</div>
                <hr />
                <div>{questions}</div>
            </div>
        )
    }
}