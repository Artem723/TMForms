'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let formSchema = new Schema({
    title: String,
    description: String,
    questions: [] //type of array can be: questionCheck, questionRadio or questionString
});

module.exports = function(db) {
    return db.model("Form", formSchema);
};