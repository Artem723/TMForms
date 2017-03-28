'use strict';
const mongoose = require('mongoose');
const QuestionSchema = require('../Schemas/QuestionSchema.js');
const Schema = mongoose.Schema;
const {
    MAX_NUMBER_OF_ANSWERS,
    MAX_NUMBER_OF_QUESTIONS,
    MAX_LENGTH_OF_QUESTION_TEXT,
    MAX_LENGTH_OF_ANSWER_TEXT
} = require("./constants")

const formSchema = new Schema({
    title: {type: String, trim: true, required: true},
    description: {type: String, trim: true},
    questions: [QuestionSchema],
    isOpen: {type: Boolean, required: true}
}, { minimize: false });
const Question = mongoose.model('question', QuestionSchema);
/**
 *@function Method validates and adds the questions to document. This method doesn't save changes.
* @param  {Array} questions array of questions that need to be added to document, required
* @param  {Object} [answersCheckable] properies are question's id and value is object possblAns
* @param  {Object} [answersString] properies are question's id and value is array of usersAns
*/
formSchema.methods.addQuestions = function (questions, answersCheckable, answersString) {
    let self = this;
    questions.forEach(function (q, ind) {
        //skip if number of questions greate than constant
        if (ind > MAX_NUMBER_OF_QUESTIONS - 1) return;
        if (typeof q.questionText !== "string" || typeof q.type !== "string" || !Array.isArray(q.possblAns)) return;
        if (q.questionText === "") return;
        if (q.questionText.length > MAX_LENGTH_OF_QUESTION_TEXT) q.questionText = q.questionText.slice(0, MAX_LENGTH_OF_QUESTION_TEXT);
        if (q.type === "check" || q.type === "radio") {
            if (q.possblAns.length === 0) return;
            
            const questionDocument = new Question({ questionText: q.questionText, type: q.type });
            questionDocument.possblAns = {};
            q.possblAns.forEach((el, ind) => {
                //if(answers && q._id) value = (answers[q._id] && answers[q._id][el]) || 0;
                //skip if number of answers greate than constant
                if (ind > MAX_NUMBER_OF_ANSWERS - 1 || !el ||  typeof el !== "string" ) return;
                el = el.trim();
                if (el.length > MAX_LENGTH_OF_ANSWER_TEXT) el = el.slice(0, MAX_LENGTH_OF_ANSWER_TEXT);
                const answers = answersCheckable;
                questionDocument.possblAns[el] = (answers && answers[q._id] && answers[q._id][el]) || 0;
                questionDocument.markModified("possblAns." + el);
            })
            self.questions.push(questionDocument);



        }
        else if (q.type === "string") {
            const answers = answersString;
            const questionDocument = new Question({ questionText: q.questionText, type: q.type });
            questionDocument.possblAns = {};
            questionDocument.markModified("possblAns");
            questionDocument.usersAns = (answers && answers[q._id]) || [];
            self.questions.push(questionDocument);
        }
        else return;

        // if(q.type === "check" || q.type === "radio") {
        //     const lastInd = self.questions.length - 1; 
        //     self.markModified("questions[lastInd].possblAns.")
        // }

    })
}
module.exports = function (db) {
    return db.model("Form", formSchema);
};