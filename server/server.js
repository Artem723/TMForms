"use strict";

let express = require("express");
let apiRoutes = require("./routes/apiRoutes");
let morgan = require("morgan");
let app = express()
let port = 4000;

app.use(morgan('dev'));
app.use("/api",apiRoutes);

app.listen(port, function () {
  console.log("Server has been started on port " + port);
})


