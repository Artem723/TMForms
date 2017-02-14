'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionVarietySchema = new Schema({
    questionText: String,
    possblAns: [String],
    type: String, // 'radio' or 'check'
    usersAns: [Number]
});


questionVarietySchema.methods.addUserAnswer = function (ans) {
    switch (this.type) {
        case "radio":
            //ans is zero-based index of possible answer
            if (typeof ans == ! "number")
                throw new Error("User answer must be type of Number, in question type 'radio'; got: " + ans + "; type" + typeof ans);
            if (ans >= this.possblAns.length)
                throw new Error("User answer is invalid: got " + ans + "; expected zero-based number less then " + this.possblAns.length);
            this.usersAns.push(ans);
            break;

        case "check":
            if (ans.constructor !== Array)
                throw new Error("User answer must be type of Array, in question type 'check'; got: " + ans + "; type" + typeof ans);
            ans.forEach(function (element) {
                if (element >= this.possblAns.length)
                    throw new Error("User answer is invalid: got " + element + "; expected zero-based number less then " + this.possblAns.length);
                this.userAns.push(element);
            });
            break;
    }
    this.save();
    /*if(ans < 0 || ans >= this.possblAns.length) throw new Error("User answer is invalid: got " + ans + "; expected zero-based number less then " + possblAns.length);
    this.usersAns.push(ans);*/
}

//module.exports = questionRadioSchema;
//module.exports = mongoose.model('questionRadio',questionRadioSchema);

module.exports = function (db) {
    return db.model("questionVariety", questionVarietySchema);
};