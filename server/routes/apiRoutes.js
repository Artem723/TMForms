"use strict";
let express = require("express");
let userRoutes = require("./userRoutes.js");

let apiRoutes = express.Router();

apiRoutes.use("/user-data",userRoutes);

apiRoutes.post("/authentication", function (req, res) {

    //create token
});

apiRoutes.post("/registration", function (req, res) {
    //create token
});

apiRoutes.get("/:userLogin/forms/:id", function(req,res) {

})

