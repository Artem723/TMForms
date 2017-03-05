'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionSchema = new Schema({
    questionText: String,
    possblAns: [String],
    type: String, // 'string', radio' or 'check'
    usersAns: [String], // type only  String, fill only with string type 
    checkRadioAns: {} //contain answer-value pair of user answers, fill only with radio and check type
},{ minimize: false });

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
           
            //check if answer exist in possble Answers and if so incrimenting value in self.checkRadioAns[el]
            if(this.possblAns.indexOf(ans) !== -1) {

                this.checkRadioAns[ans] ? this.checkRadioAns[ans]++ : this.checkRadioAns[ans] = 1 ;   
            }
            this.markModified("checkRadioAns." + ans);
            break;

        case "check":
            if (ans.constructor !== Array)
                return;
            ans.forEach(function(el){
                if(typeof el !== "string") return;
                //check if answer exist in possble Answers as well as radio type
                if(self.possblAns.indexOf(el) !== -1) {
                self.checkRadioAns[el] ? self.checkRadioAns[el]++ : self.checkRadioAns[el] = 1 ;
                self.markModified("checkRadioAns." + el);
            }
            });
            break;
        case "string":
            if(typeof ans !== "string") return;
            //validation of string 
            ans = ans.length>50 ? ans.slice(0,50) : ans;
            this.usersAns.push(ans);
    }
    
    //this.save();
    /*if(ans < 0 || ans >= this.possblAns.length) throw new Error("User answer is invalid: got " + ans + "; expected zero-based number less then " + possblAns.length);
    this.usersAns.push(ans);*/
}

//module.exports = questionRadioSchema;
//module.exports = mongoose.model('questionRadio',questionRadioSchema);

module.exports = questionSchema;