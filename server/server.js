"use strict";

let express = require("express");
let apiRoutes = require("./routes/apiRoutes");
let morgan = require("morgan");
let app = express()

//app.use(morgan);
app.use(apiRoutes);

app.listen(3000, function () {
  console.log("Server has been started");
})


