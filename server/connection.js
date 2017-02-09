"use strict";

let mongoose = require("mongoose");
let dbURI = require("./config").dbUri;
mongoose.connect(dbURI);


module.exports = mongoose;