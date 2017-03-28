"use strict";
let express = require("express");
let connection = require("../connection");
var ObjectId = connection.Types.ObjectId;

let Form = (require("../models/Form"))(connection);
let middlewares = require("./middlewares");
let verifyToken = middlewares.verifyToken;
let findUser = middlewares.findUser;
let checkPermission = middlewares.checkPermission;
let findForm = middlewares.findForm;


let userRoutes = express.Router();

userRoutes.use(verifyToken);
userRoutes.use(findUser);
/**
 * This middleware returns to client array object with the following structure: 
 *  {
 *     _id: String,
 *      title: string
 *  }
 * 
 */
userRoutes.get("/forms", function (req, res) {
    //return to client array of object {_id, title}
    let options = {
        path: "forms",
        select: "title",
    }
    req.user.populate(options, function (err, user) {
        if (err) {
            res.status(500).json({ message: "Internal server error. Can't find user." }).end();
            throw err;
        }
        res.json(user.forms).end();
    });

    //res.json(req.user.forms).end();

});


userRoutes.post("/forms", function (req, res) {
    /** request
     * {
     *  isOpen: Boolean,
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
    let isOpen = req.body.isOpen;
    if (typeof title !== "string" || typeof description !== "string" || !Array.isArray(questions) || typeof isOpen !== "boolean") {
        res.status(400).json({ message: "The data type of the submitted form is not valid" }).end();
        return;
    }
    let newForm = new Form({
        title: title,
        description: description,
        isOpen: isOpen
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
    .put(/*findForm,*/ function (req, res) {
        /** req.body should be
         * {
         *  isOpen: Boolean,
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

        const body = req.body;
        const form = req.form;
        if (typeof body.title !== "string" || typeof body.description !== "string" || !Array.isArray(body.questions) || typeof body.isOpen !== "boolean") {
            res.status(400).json({ message: "The data type of the submitted form is not valid" }).end();
            return;
        }
        //if title or description is empty then reject request
        if(!body.title || !body.description) {
            res.status(400).json({ message: "The data type of the submitted form is not valid" });
        }
        form.title = body.title;
        form.description = body.description;
        form.isOpen = body.isOpen;
        //save user's answers into buffer to restore
        //answers is object whose propertys are question's id and values are possblAns
        const answersString = {};
        const answersCheckable = {};
        form.questions.forEach((q)=>{
            if(q.type === "string")
                answersString[q.id] = q.usersAns;
            else 
                answersCheckable[q.id] = q.possblAns;
        })
        form.questions = [];
        form.addQuestions(body.questions, answersCheckable, answersString);
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
/**
 * Route sends results to client as JSON object in the following format:
 *  {
 *      type: String, one of {"check", "radio" or "string"}, 
 *      answers: Array or Object, depends on type: if type is "string", usersAns will be Array, otherwise - Object, that will contain pair {answer: count}  
 *      id: String, id of question,
 *      questionText: String
 *  }
 */
userRoutes.get("/results/forms/:id", checkPermission, findForm, function (req, res) {
    let form = req.form;
    let resArr = form.questions.map(function (q) {
        let answers;
        if (q.type === "string")
            answers = q.usersAns;
        else
            answers = q.possblAns
        return {
            type: q.type,
            answers: answers,
            id: q.id,
            questionText: q.questionText
        }
    });
    res.json(resArr).end();
})

module.exports = userRoutes;