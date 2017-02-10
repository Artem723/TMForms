"use strict";
let express = require("express");
let jwt = require('jsonwebtoken');
let secretWord = require("../config").secret;
let connection = require("../connection");
let User = (require("../models/User"))(connection);

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
        console.log("Succesfully");
        next();
    })
}

userRoutes.use(verifyToken);

userRoutes.get("/forms", function (req, res) {
    //return to client array of id
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
        let arrOfFormId = [];
        user.forms.forEach(function (elment) {
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
     *          question: String,
     *          type: String, //check, radio or String
     *          possblAns: [String] //optional
     *      }
     *  ]
     * }
     */
})

userRoutes.route("/forms/:id")
    .get(function (req, res) {

    }).put(function (req, res) {

    }).delete(function (req, res) {

    });

module.exports = userRoutes;