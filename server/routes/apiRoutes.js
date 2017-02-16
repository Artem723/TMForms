"use strict";
let express = require("express");
let userRoutes = require("./userRoutes.js");
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let secretWord = require("../config").secret;

let connection = require("../connection");
let User = (require("../models/User"))(connection);
let Form = (require("../models/Form"))(connection);


let apiRoutes = express.Router();
/**
* Function finds form and sets property req.login to found form
* @param  {Object} req  {HTTP request}
* @param  {Object} res  {HTTP response}
* @param  {next} next {move to next middleware}
* 
*/
function findForm(req, res, next) {
    Form.findById(req.params.id, function (err, form) {
        if (err) {
            res.status(500).json({ message: "Internal server error" }).end();
            throw err;
        }
        if (!form) {
            res.status(404).json({ message: "Form not found" }).end();
            return;
        }
        req.form = form;
        next();
    });
}

apiRoutes.use(bodyParser.json());


apiRoutes.post("/authentication", function (req, res) {
    /**req.body
     * {
     *  login: String,
     *  password: String
     * } */
    let body = req.body;
    if (!body.login || !body.password) {
        res.status(400).json({ message: "Missed field." }).end();
        return;
    }
    User.findOne({ login: body.login }, function (err, user) {
        if (err) {
            res.status(500).json({ message: "Internal server error" }).end();
            throw err;
        }
        if (!user) {
            res.status(404).json({ message: "User not found." }).end();
            return;
        }
        if (user.isPasswordValid(body.password)) {
            jwt.sign({ login: body.login }, secretWord, { expiresIn: "7d" }, function (err, token) {
                if (err) {
                    res.status(500).json({ message: "Internal server error" }).end();
                    throw err;
                }
                res.json({ token: token }).end();
            })
        }
        else {
            res.status(401).json({ message: "Wrong password." }).end();
        }

    })

});

apiRoutes.post("/registration", function (req, res) {
    /**req.body
     * {
     *  login: String,
     *  password: String
     * } */
    let body = req.body;
    if (!body.login || !body.password) {
        res.status(400).json({ message: "Missed field." }).end();
        return;
    }
    if (!body.login.match(/^[a-zA-Z0-9_]{3,15}$/)) {
        res.status(400).json({ message: "Invalid 'userName' field. It must be combinations of symbols a-z, A-Z , 0-9 and '_'; and number of symbols should be from 3 to 15." }).end();
        return;
    }
    if (body.password.length < 5) {
        res.status(400).json({ message: "Password too small. Password must be at least 5 symbols." }).end();
        return;
    }
    User.findOne({ login: body.login }, function (err, user) {
        if (err) {
            res.status(500).json({ message: "Internal server error" }).end();
            throw err;
        }
        if (user) {
            res.status(400).json({ message: "User alredy exists" }).end();
            return;
        }
        let newUser = new User({
            login: body.login,
        });
        console.log(newUser);
        newUser.setPassword(body.password);
        newUser.save(function (err) {
            if (err) {
                res.status(500).json({ message: "Internal server error" }).end();
                throw err;
            }
            res.end();
        })
    })

});

apiRoutes.route("/forms/:id")
    .all(findForm)
    .post(function (req, res) {
        /**
         * request
         * [
         *  {
         *      id: String,
         *      usersAns: [Number], Number or String
         *  }
         * ]
         */
        let form = req.form;
        if(!Array.isArray(req.body)) {
            res.status(400).json({ message: "Request body must be an Array type." }).end();
            return;
        };
        req.body.forEach(function (el) {
            // let question = form.questions.find(function(q){
            //     console.log(q._id + "---" + el.id + ": " + (q._id == el.id));
            //     if(q._id == el.id) return true;
            // });
            // try {
            //     console.log(question.__proto__);
            //     question.addUserAnswer(el.usersAns);
            // }
            // catch(err) {
            //     console.log("error occured " + err);
            // }
            let question = form.questions.id(el.id);
            //console.log("Question: " + question);
            if(question === null) return;
            question.addUserAnswer(el.usersAns);
        });
        form.save(function(err){
            if(err) {
                res.status(500).json({ message: "Internal server Error." }).end();
                throw err;
            }
            res.end("");
        })
        
    })
    .get(function (req, res) {
        //send form data with questions without field "usersAns"
        let form = req.form;
        form.questions.forEach(function (el) {
            el.usersAns = undefined;
        });
        res.json(form).end();


    });

apiRoutes.use(userRoutes);

module.exports = apiRoutes;

