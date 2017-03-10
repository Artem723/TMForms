'use strict';
const mongoose = require('mongoose');
const QuestionSchema = require('../Schemas/QuestionSchema.js');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    title: String,
    description: String,
    questions: [QuestionSchema],
    isOpen: Boolean
}, { minimize: false });
const Question = mongoose.model('question', QuestionSchema);
/**
 * Method validates and adds the questions to document. This method doesn't save changes.
* @param  {Array} questions {array of questions that need to be added to document}
* 
*/
formSchema.methods.addQuestions = function (questions, answers) {
    let self = this;
    questions.forEach(function (q) {
        //questions souldn't contain id field
        if (q._id) q._id = undefined;
        if (typeof q.questionText !== "string" || typeof q.type !== "string" || !Array.isArray(q.possblAns)) return;
        if (q.questionText.length > 200) q.questionText = q.questionText.slice(0, 200);
        if (q.type === "check" || q.type === "radio") {
            if (q.possblAns.length === 0) return;
            //TODO check possblAns on unique and empty values(use Set)
            /*
            const possblAns = q.possblAns;
            q.possblAns = {};
            self.questions.push(q);
            const lastInd = self.questions.length - 1;

            possblAns.forEach((el) => {
                if(el.length > 100) el = el.slice(0,100);                 
                self.questions[lastInd].possblAns[el] = 0;
                self.markModified("questions[" + lastInd + "].possblAns." + el)
            })*/
            const  questionDocument = new Question({questionText: q.questionText, type: q.type});
            questionDocument.possblAns = {};
            q.possblAns.forEach((el)=>{
                if(el.length > 100) el = el.slice(0,100);
                questionDocument.possblAns[el] = 0;               
                questionDocument.markModified("possblAns." + el);
            })
            self.questions.push(questionDocument);
            


        }
        else if (q.type === "string") {
            q.possblAns = {};
            self.questions.push(q);
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