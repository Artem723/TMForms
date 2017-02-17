"use strict";
let express = require("express");
let connection = require("../connection");
var ObjectId = connection.Types.ObjectId;

let Form = (require("../models/Form"))(connection);
//let QuestionString = (require("../models/QuestionString"))(connection);
//let QuestionVariety = (require("../models/QuestionVariety"))(connection);
let middlewares = require("./middlewares");
let verifyToken = middlewares.verifyToken;
let findUser = middlewares.findUser;
let checkPermission = middlewares.checkPermission;
let findForm = middlewares.findForm;


let userRoutes = express.Router();

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
    .put(findForm, function (req, res) {
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
        let form = req.form;
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
userRoutes.get("/results/forms/:id", checkPermission, findForm, function (req, res) {
        let form = req.form;
        let resArr = form.questions.map(function(q) {
            return {
                type: q.type,
                possblAns: q.possblAns,
                usersAns: q.usersAns 
            }
        });
        res.json(resArr).end();    
})

module.exports = userRoutes;