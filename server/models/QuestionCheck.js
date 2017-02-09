'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionCheckSchema = new Schema({
    question: String,
    possblAns: [String],
    usersAns: [Number]
});

questionCheckSchema.methods.addUserAnswer = function(ans /*array*/){
    
    if(ans < 0 || ans >= this.possblAns.length) throw new Error("User answer is invalid: got " + ans + "; expected zero-based number less then " + possblAns.length);
    this.usersAns.push(ans);
}



//module.exports = questionCheckSchema;
//module.exports = mongoose.model('questionCheck',questionCheckSchema);
module.exports = function(db) {
    return db.model("questionCheck", questionCheckSchema);
};