"use strict";
let jwt = require('jsonwebtoken');
let secretWord = require("../config").secret;
let connection = require("../connection");
let User = (require("../models/User"))(connection);
let Form = (require("../models/Form"))(connection);
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
    let authHeader = req.get("Authorization");
    if(!authHeader) {
        res.status(401).end();
        return;
    }
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
* Checks if user with specified token, can modify form with this id
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

exports.findForm = findForm;
exports.verifyToken = verifyToken;
exports.findUser = findUser;
exports.checkPermission = checkPermission;