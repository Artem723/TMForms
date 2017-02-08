'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionStringSchema = new Schema({
    question: String,
    usersAns: [String]
});

//module.exports = questionStringSchema;
module.exports = mongoose.model('questionRadio',questionRadioSchema);