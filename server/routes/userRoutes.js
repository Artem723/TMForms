"use strict";
let express = require("express");
let jwt = require('jsonwebtoken');
let secretWord = require("../config").secret;
let connection = require("../connection");
let User = (require("../models/User"))(connection);

let Form = (require("../models/Form"))(connection);
let QuestionString = (require("../models/QuestionString"))(connection);
let QuestionVariety = (require("../models/QuestionVariety"))(connection);


let userRoutes = express.Router();

function verifyToken(req, res, next) {
    //DONE add user.login to req.userLogin
    //let token = req.body.token;
    let token = req.get("Authorization").split(" ")[1];

    jwt.verify(token, secretWord, function (err, decoded) {
        if (err) {
            res.status(401).json({ message: 'Authorization failed. Wrong token.' }).end();
            return;
        }
        req.userLogin = decoded.login;
        next();
    });
};

function findUser(req, res, next) {
    let login = req.userLogin;
    User.findOne({ login: login }, function (err, user) {
        if (err) {
            res.status(500).json({ message: "Internal server error" }).end();
            throw err;
        }
        if (!user) {
            res.status(404).json({ message: "User not found" }).end();
            return;
        }
        req.user = user;
        next();

    });
};

userRoutes.use(verifyToken);
userRoutes.use(findUser);

userRoutes.get("/forms", function (req, res) {
    //return to client array of id
    let user = req.user;
    let arrOfFormsId = [];
    user.forms.forEach(function (element) {
        arrOfFormsId.push(element);
    });
    res.json(arrOfFormsId).end();

});


userRoutes.post("/forms", function (req, res) {
    /** request
     * {
     *  title: String,
     *  description: String,
     *  questions: [
     *      {
     *          questionText: String,
     *          type: String, //check, radio or string
     *          possblAns: [String] //optional
     *      }
     *  ]
     * }
     */

    let user = req.user;
    let title = req.body.title;
    let description = req.body.description;
    let questions = req.body.questions;
    if (typeof title !== "string" || typeof description !== "string" || questions.constructor !== Array) {
        res.status(400).json({ message: "The data type of the submitted form is not valid" }).end();
        return;
    }
    let newForm = new Form({
        title: title,
        description: description
    });

    questions.forEach(function (el) {
        // !!!!! fix
        // if(typeof el.questionText !== "string" || typeof type !== "string") {
        //     res.status(400).json({ message: "The data type of the submitted question is not valid" }).end();
        //     return;
        // }
        let question;
        switch (el.type) {
            case "check":
                question = new QuestionVariety({ questionText: el.questionText, type: "check" });
                question.possblAns.push.apply(question.possblAns, el.possblAns);
                break;
            case "radio":
                question = new QuestionVariety({ questionText: el.questionText, type: "radio" });
                question.possblAns.push.apply(question.possblAns, el.possblAns);
                break;
            case "string":
                question = new QuestionString({ questionText: el.questionText });
                break;
            default:
                throw new Error("Invalid type of question(got : " + el.type + " )");
                break;
        }
        newForm.questions.push(question);

    });
    newForm.save(function (err, form) {
        if (err) {
            res.status(500).json({ message: "Internal server error. Can't find user." }).end();
            throw err;
        }
        user.forms.push(form._id)
        user.save(function (err, user) {
            if (err) {
                res.status(500).json({ message: "Internal server error. Can't save new form." }).end();
                throw err;
            }

            res.set("Location", "/api/forms/" + form.id).end("Success");
        });
    });
});



userRoutes.route("/forms/:id")
    .all(function (req, res, next) {
        let user = req.user;
        let formId = req.params.id;
        if (user.forms.indexOf(formId) === -1) {
            res.status(403).json({ message: "Permission denied. You can't update/delete form with id: " + formId + ". Or you doesn't have it yet." }).end();
            return;
        }
        next();
    })
    .put(function (req, res) {
        /** request
         * {
         *  title: String,
         *  description: String,
         *  questions: [
         *      {
         *          questionText: String,
         *          type: String, //check, radio or string
         *          possblAns: [String] //optional
         *      }
         *  ]
         * }
         */
        let body = req.body;
        Form.findById(req.params.id, function (err, form) {
            if (err) {
                res.status(500).json({ message: "Internal server error. Can't save new form." }).end();
                throw err;
            }
            
            form.title = body.title;
            form.description = body.description;
            form.questions = [];
            
            body.questions.forEach(function (el) {
                let question;
                switch (el.type) {
                    case "check":
                        question = new QuestionVariety({ questionText: el.questionText, type: "check" });
                        question.possblAns.push.apply(question.possblAns, el.possblAns);
                        break;
                    case "radio":
                        question = new QuestionVariety({ questionText: el.questionText, type: "radio" });
                        question.possblAns.push.apply(question.possblAns, el.possblAns);
                        break;
                    case "string":
                        question = new QuestionString({ questionText: el.questionText });
                        break;
                    default:
                        throw new Error("Invalid type of question(got : " + el.type + " )");
                        break;
                }
                form.questions.push(question);
                form.save(function(err){
                    if(err) {
                        res.status(500).json({ message: "Internal server error. Can't save form." }).end();
                        throw err;
                    }
                    res.end("Success")
                });
            });

        });

    }).delete(function (req, res) {

    });

module.exports = userRoutes;