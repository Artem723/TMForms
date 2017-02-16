"use strict";
let express = require("express");
let jwt = require('jsonwebtoken');
let secretWord = require("../config").secret;
let connection = require("../connection");
var ObjectId = connection.Types.ObjectId;
let User = (require("../models/User"))(connection);

let Form = (require("../models/Form"))(connection);
//let QuestionString = (require("../models/QuestionString"))(connection);
//let QuestionVariety = (require("../models/QuestionVariety"))(connection);


let userRoutes = express.Router();
/**
* Function verifies token and if it's valid, add user's login to property req.userLogin 
* @param  {Object} req  {HTTP request}
* @param  {Object} res  {HTTP response}
* @param  {next} next {move to next middleware}
* 
*/
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
/**
* Finds user with specified login in field req.userLogin and adds its to req.user field
* @param  {Object} req  {HTTP request}
* @param  {Object} res  {HTTP response}
* @param  {Function} next {move to next middleware}
*/
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

/**
* Checks if user with specified token can modify form with this id
* @param  {Object} req {request}
* @param  {Object} res  {response}
* @param  {Function} next  {function to transfer of control next middleware}
*/
function checkPermission(req, res, next) {
    let user = req.user;
    let formId = req.params.id;
    if (user.forms.indexOf(formId) === -1) {
        res.status(403).json({ message: "Permission denied. You can't update/delete form with id: " + formId + ". Or you doesn't have it yet." }).end();
        return;
    }
    next();
}

userRoutes.use(verifyToken);
userRoutes.use(findUser);

userRoutes.get("/forms", function (req, res) {
    //return to client array of id
    // let user = req.user;
    // let arrOfFormsId = [];
    // user.forms.forEach(function (element) {
    //     arrOfFormsId.push(element);
    // });
    res.json(req.user.forms).end();

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
     *          possblAns: [String] //if string it must be empty
     *      }
     *  ]
     * }
     */

    let user = req.user;
    let title = req.body.title;
    let description = req.body.description;
    let questions = req.body.questions;
    if (typeof title !== "string" || typeof description !== "string" || !Array.isArray(questions)) {
        res.status(400).json({ message: "The data type of the submitted form is not valid" }).end();
        return;
    }
    let newForm = new Form({
        title: title,
        description: description
    });

    newForm.addQuestions(questions);
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
    .all(checkPermission)
    .put(function (req, res) {
        /** req.body should be
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
                res.status(500).json({ message: "Internal server error. Can't find form." }).end();
                throw err;
            }
            if (!form) {
                res.status(404).json({ message: "Form not found" }).end();
                return;
            }
            if (typeof body.title !== "string" || typeof body.description !== "string" || !Array.isArray(body.questions)) {
                res.status(400).json({ message: "The data type of the submitted form is not valid" }).end();
                return;
            }

            form.title = body.title;
            form.description = body.description;
            form.questions = [];
            form.addQuestions(body.questions);
            form.save(function (err) {
                if (err) {
                    res.status(500).json({ message: "Internal server error. Can't save form." }).end();
                    throw err;
                }
                res.end("Success");
            })

        });

    }).delete(function (req, res) {
        Form.findByIdAndRemove(req.params.id, function (err, form) {
            if (err) {
                res.status(500).json({ message: "Internal server error. Can't delete form." }).end();
                throw err;
            }
            console.log(req.params.id);
            req.user.forms.pull(new ObjectId(req.params.id));
            req.user.save(function (err) {
                if (err) {
                    res.status(500).json({ message: "Internal server error. Can't save user." }).end();
                    throw err;
                }
                res.end("Success");
            })

        })
    });
userRoutes.get("/results/forms/:id", checkPermission, function (req, res) {
    Form.findById(req.params.id, function (err, form) {
        if (err) {
            res.status(500).json({ message: "Internal server error. Can't find form." }).end();
            throw err;
        }
        if (!form) {
            res.status(404).json({ message: "Form not found" }).end();
            return;
        }
        let resArr = form.questions.map(function(q) {
            return {
                type: q.type,
                possblAns: q.possblAns,
                usersAns: q.usersAns 
            }
        });
        res.json(resArr).end();


    })
})

module.exports = userRoutes;