'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionRadioSchema = new Schema({
    questionText: String,
    possblAns: [String],
    usersAns: [Number]
});

questionRadioSchema.methods.addUserAnswer = function(ans){
    if(ans < 0 || ans >= this.possblAns.length) throw new Error("User answer is invalid: got " + ans + "; expected zero-based number less then " + possblAns.length);
    this.usersAns.push(ans);
}

//module.exports = questionRadioSchema;
//module.exports = mongoose.model('questionRadio',questionRadioSchema);
module.exports = function(db) {
    return db.model("questionRadio", questionRadioSchema);
};