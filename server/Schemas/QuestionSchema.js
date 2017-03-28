'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionSchema = new Schema({
    questionText: {type: String, trim: true, required: true},
    possblAns: {},//key value pair, where key is answer, value is numbers of replies to it. Should be empty if type isn't "check" or "radio"
    type: {type: String, enum: ["string", "radio", "check"], required: true}, // 'string', radio' or 'check'
    usersAns: [String] // type only  String, fill only with string type
}, { minimize: false });

/**
* Adds user's answer to Data Base
* @param  {String, Array of String} ans {user answer, data type depends on question type}
* 
*/
questionSchema.methods.addUserAnswer = function (ans) {

    let self = this;
    switch (this.type) {
        case "radio":

            if (typeof ans !== "string")
                return;

            //check if answer exist in possble Answers and if so incrimenting value in self.possblAns[el]
            if (this.possblAns[ans] !== undefined) {
                this.possblAns[ans]++;
                this.markModified("possblAns." + ans);
            }
            break;

        case "check":
            if (!Array.isArray(ans))
                return;
            ans.forEach(function (el) {
                if (typeof el !== "string") return;
                //check if answer exist in possble Answers as well as radio type

                if (self.possblAns[el] !== undefined) {
                    self.possblAns[el]++;
                    self.markModified("possblAns." + el);
                }
            });
            break;
        case "string":
            if (typeof ans !== "string") return;
            //validation of string
            ans.trim();
            if(!ans) return; //skip empty strings 
            ans = ans.length > 50 ? ans.slice(0, 50) : ans;
            this.usersAns.push(ans);
    }

    //this.save();
    /*if(ans < 0 || ans >= this.possblAns.length) throw new Error("User answer is invalid: got " + ans + "; expected zero-based number less then " + possblAns.length);
    this.usersAns.push(ans);*/
}

//module.exports = questionRadioSchema;
//module.exports = mongoose.model('questionRadio',questionRadioSchema);

module.exports = questionSchema;