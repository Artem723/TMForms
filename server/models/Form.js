'use strict';
let mongoose = require('mongoose');
let QuestionSchema = require('../Schemas/QuestionSchema.js');
let Schema = mongoose.Schema;

let formSchema = new Schema({
    title: String,
    description: String,
    questions: [QuestionSchema],
    isOpen: Boolean
});
/**
 * Method validates and adds the questions to document. This method doesn't save changes.
* @param  {Array} questions {array of questions that need to be added to document}
* 
*/
formSchema.methods.addQuestions = function (questions) {
    let self = this;
    questions.forEach(function (q) {
        if (typeof q.questionText !== "string" || typeof q.type !== "string" || !Array.isArray(q.possblAns)) return;
        if (q.type === "check" || q.type === "radio") {
            if (q.possblAns.length === 0) return;
        }
        else if (q.type === "string") {
            if (q.possblAns.length > 0) q.possblAns = [];
        }
        else return;
        self.questions.push(q);
    })
}

module.exports = function (db) {
    return db.model("Form", formSchema);
};