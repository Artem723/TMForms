import React, { Component } from "react"
import QuestionEdit from "../QuestionEdit"
import "./Editor.css"
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
export default class Editor extends Component {
    render() {
        const questions = form.questions.map((el) => {
            const {_id, possblAns, type, questionText} = el;
            return <QuestionEdit key={_id} type={type} possblAns={possblAns} questionText={questionText} />
        })
        return (
            <div className="Editor">
                <div className="Editor-link">
                    <div>
                        Link:
                    </div>
                    <div>
                        {"http://localhost:3000/forms/" + form._id}
                    </div>
                </div>
                <h1>{form.title}</h1>
                <div>{form.description}</div>
                <button>Results</button>{" "}<button>Save</button>
                {questions}
                <button>Add</button>
            </div>
        )
    }
}