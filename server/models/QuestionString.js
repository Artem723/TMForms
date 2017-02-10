'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionStringSchema = new Schema({
    questionText: String,
    usersAns: [String]
});

//module.exports = questionStringSchema;
//module.exports = mongoose.model('questionString',questionStringSchema);
module.exports = function(db) {
    return db.model("questionString", questionStringSchema);
};