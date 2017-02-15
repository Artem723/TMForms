'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionSchema = new Schema({
    questionText: String,
    possblAns: [String],
    type: String, // 'string', radio' or 'check'
    usersAns: [] // type only Number of String
});

/**
* Adds user's answer to Data Base
* @param  {String, Array, Number} ans {user answer, data type depends on question type}
* 
*/
questionSchema.methods.addUserAnswer = function (ans) {
    // switch (this.type) {
    //     case "radio":
    //         //ans is zero-based index of possible answer
    //         if (typeof ans == ! "number")
    //             throw new Error("User answer must be type of Number, in question type 'radio'; got: " + ans + "; type" + typeof ans);
    //         if (ans >= this.possblAns.length)
    //             throw new Error("User answer is invalid: got " + ans + "; expected zero-based number less then " + this.possblAns.length);
    //         this.usersAns.push(ans);
    //         break;

    //     case "check":
    //         if (ans.constructor !== Array)
    //             throw new Error("User answer must be type of Array, in question type 'check'; got: " + ans + "; type" + typeof ans);
    //         ans.forEach(function (element) {
    //             if (element >= this.possblAns.length)
    //                 throw new Error("User answer is invalid: got " + element + "; expected zero-based number less then " + this.possblAns.length);
    //             this.userAns.push(element);
    //         });
    //         break;
    // }
    let self = this;
    switch (this.type) {
        case "radio":
            //ans is zero-based index of possible answer
            if (typeof ans !== "number")
                return;
            if (ans >= this.possblAns.length || ans < 0)
                return;
            this.usersAns.push(ans);
            break;

        case "check":
            if (ans.constructor !== Array)
                return;
            ans.forEach(function(el){
                if(typeof el !== "number") return;
                if(el >= self.possblAns.length || el < 0) return;
                self.usersAns.push(el);
            });
            break;
        case "string":
            if(typeof ans !== "string") return;
            this.usersAns.push(ans);
    }
    //this.save();
    /*if(ans < 0 || ans >= this.possblAns.length) throw new Error("User answer is invalid: got " + ans + "; expected zero-based number less then " + possblAns.length);
    this.usersAns.push(ans);*/
}

//module.exports = questionRadioSchema;
//module.exports = mongoose.model('questionRadio',questionRadioSchema);

module.exports = questionSchema;