let express = require("express");

let userRoutes = express.Router();

function verifyToken(req, res, next) {
    //TODO add user.login to req.userLogin
}

userRoutes.use(verifyToken);

userRoutes.get("forms", function (req, res) {

})

userRoutes.post("/forms", function (req, res) {

})

userRoutes.route("/forms/:id")
    .get(function (req, res) {

    }).put(function (req, res) {

    }).delete(function (req, res) {

    });

module.exports = userRoutes;