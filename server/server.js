"use strict";

let express = require("express");
let apiRoutes = require("./routes/apiRoutes");
let morgan = require("morgan");
let app = express()

app.use(morgan('dev'));
app.use("/api",apiRoutes);

app.listen(3000, function () {
  console.log("Server has been started");
})


