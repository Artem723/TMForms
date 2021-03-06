'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require("bcrypt-nodejs");


let userSchema = new Schema({
    login: { type: String, unique: true, required: true },
    hashedPassword: String,
    forms: [{type: Schema.Types.ObjectId, ref: "Form"}]
});
/**
* Hashs user's password and save its in db
* @param  {String} password {User's password}
*/
userSchema.methods.setPassword = function (password) {
    //TODO hash password
    let self = this;
    bcrypt.hash(password, null, null, function(err, hash){
        if(err) throw err;
        self.hashedPassword = hash;
    })
}
/**
* Check user's password
* @param  {String} password {User's password}
*/
userSchema.methods.isPasswordValid = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword);
}


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
