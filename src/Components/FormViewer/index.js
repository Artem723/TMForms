import React, {Component} from "react"

const form = {
    "_id":  "58a6e353702e7410f4a33ee2",
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
            "_id":  "58a6e8ff9070be11bc9466b2",
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
        return (
            <div>
                Show form
            </div>
        )
    }
}