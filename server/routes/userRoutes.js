"use strict";
let express = require("express");
let jwt = require('jsonwebtoken');
let secretWord = require("../config").secret;
let connection = require("../connection");
let User = (require("../models/User"))(connection);

let formSchema = require("../models/schemas/form");
let Form = connection.model("Form", formSchema);
let QuestionString = (require("../models/QuestionString"))(connection);
let QuestionRadio = (require("../models/QuestionRadio"))(connection);
let QuestionCheck = (require("../models/QuestionCheck"))(connection);


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
    })
}

userRoutes.use(verifyToken);

userRoutes.get("/forms", function (req, res) {
    //return to client array of id
    let login = req.userLogin;
    console.log("Awdawd");
    console.log(login);
    User.findOne({ login: login }, function (err, user) {
        if (err) {
            res.status(500).json({ message: "Internal server error" }).end();
            throw err;
        }
        if (!user) {
            res.status(404).json({ message: "User not found" }).end();
            return;
        }
        let arrOfFormId = [];
        user.forms.forEach(function (element) {
            arrOfFormId.push(element.id);
        });
        res.json(arrOfFormId).end();
    })
})

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

    let login = req.userLogin;
    let title = req.body.title;
    let description = req.body.description;
    let questions = req.body.questions;
    if (typeof title !== "string" || typeof description !== "string" || questions.constructor !== Array) {
        res.status(400).json({ message: "The data type of the submitted form is not valid" }).end();
        return;
    }
    User.findOne({ login: login }, function (err, user) {
        if (err) {
            res.status(500).json({ message: "Internal server error. Can't find user." }).end();
            throw err;
        }
        if (!user) {
            res.status(404).json({ message: "User not found" }).end();
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
                    question = new QuestionCheck({ questionText: el.questionText });
                    question.possblAns.push.apply(possblAns, el.possblAns);
                    break;
                case "radio":
                    question = new QuestionRadio({ questionText: el.questionText });
                    question.possblAns.push.apply(question.possblAns, el.possblAns);
                    break;
                case "string":
                    question = new QuestionString({questionText: el.questionText});
                    break;
                default:
                    throw new Error("Invalid type of question(got : " + el.type + " )");
                    break;
            }
            newForm.questions.push(question);

        });
        // newForm.save(function(err, form){
        //     if(err) {
        //         res.status(500).json({ message: "Internal server error. Can't save new form." }).end();
        //         throw err;
        //     }

        //     res.set("Location", "/api/user-data/forms/" + form.id).end("Success");
        // })
        user.forms.push(newForm);
        user.save(function(err, user){
            if(err) {
                res.status(500).json({ message: "Internal server error. Can't save new form." }).end();
                throw err;
            }

            res.set("Location", "/api/user-data/forms/" + newForm.id).end("Success");
        })
      

    });
})

userRoutes.route("/forms/:id")
    .get(function (req, res) {
        
    }).put(function (req, res) {

    }).delete(function (req, res) {

    });

module.exports = userRoutes;