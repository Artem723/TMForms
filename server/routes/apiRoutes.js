"use strict";
let express = require("express");
let userRoutes = require("./userRoutes.js");
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let secretWord = require("../config").secret;

let connection = require("../connection");
let User = (require("../models/User"))(connection);
let middlewares = require("./middlewares");
let findForm = middlewares.findForm;
let checkPermission = middlewares.checkPermission;
let findUser = middlewares.findUser;
let verifyToken = middlewares.verifyToken;


let apiRoutes = express.Router();

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
            jwt.sign({ login: body.login }, secretWord, { expiresIn: "7d" }, function (err, token) {
                if (err) {
                    res.status(500).json({ message: "Internal server error" }).end();
                    throw err;
                }
                res.json({ token: token }).end();
            })

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
         *      answers: [String] or String, must be Array, if question type is "check"
         *  }
         * ]
         */
        
        let form = req.form;
        if (!form.isOpen) res.status(403).json({ message: "Form is closed." }).end()
        if (!Array.isArray(req.body)) {
            res.status(400).json({ message: "Request body must be an Array type." }).end();
            return;
        };
        req.body.forEach(function (el) {
            let question = form.questions.id(el.id);
            //console.log("Question: " + question);
            if (question === null) return;
            question.addUserAnswer(el.answers);

        });
        form.save(function (err) {
            if (err) {
                res.status(500).json({ message: "Internal server Error." }).end();
                throw err;
            }
            res.json({ message: "Success"} ).end();
        })
    })
    .get(function (req, res, next) {
        //send form data with questions without field "usersAns"
        let form = req.form;
        if (req.get("Authorization")) {
            next();
            return;
        }
        if (!form.isOpen) {
            res.status(403).json({ message: "Form is closed." }).end();
            return;
        }
        const questionList = form.questions.map(function (el) {
            return {
                questionText: el.questionText,
                type: el.type,
                _id: el.id,
                possblAns: Object.keys(el.possblAns)
            }
        });
        const resForm = {
            title: form.title,
            description: form.description,
            questions: questionList
        }
        res.json(resForm).end();
    },
    verifyToken,
    findUser,
    checkPermission,
    function (req, res) {
        req.form.questions.forEach(function (el) {
            el.usersAns = null;
            el.possblAns = Object.keys(el.possblAns);
        });
        res.json(req.form).end();
    });

apiRoutes.use(userRoutes);

module.exports = apiRoutes;

