'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let formSchema = require('./schemas/form.js');
let QuestionString = require("./QuestionString");
let QuestionRadio = require("./QuestionRadio");
let QuestionCheck = require("./QuestionCheck");


let userSchema = new Schema({
    login: { type: String, unique: true, required: true },
    hashedPassword: String,
    forms: [formSchema]
});

userSchema.methods.setPassword = function (password) {
    //TODO hash password
    this.hashedPassword = password;
}
userSchema.methods.isPasswordValid = function(password) {
    //TODO verufy hashes
    return password === this.hashedPassword;
}
// let User = mongoose.model("User", userSchema);
// let Form = mongoose.model("Form", formSchema);

module.exports = function(db) {
    return db.model("User", userSchema);
};
//testing----
/*mongoose.connect('mongodb://application:3!G6PK@ds145669.mlab.com:45669/forms_db');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We've connected!");
    //   let user1 = new User({login: "TestUser1"});
    User.findOne({ login: "TestUser1" }, function (err, user) {
        if(err) console.log("Err: " + err);
        console.log(user);
        console.log(user.forms.id("589affd75a8d631bb42facb2"))
        user.save(function (err) {
            if (err) console.log("error: " + err.message);
        });
    });  
  
});


*/
//--end--testing---
