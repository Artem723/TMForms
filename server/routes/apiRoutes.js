let express = require("express");

let apiRoute = express.Router();

function verifyToken(req, res, next) {

}

apiRoute.post("/authentication", verifyToken, function(req, res){

});

apiRoute.post("/registration", function(req, res){

});