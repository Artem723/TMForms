"use strict";

let express = require("express");
let apiRoutes = require("./routes/apiRoutes");
let morgan = require("morgan");
let path= require("path");
let app = express()
let port = 4000;


app.use(express.static(path.join(__dirname, "..",'build')));

app.use(morgan('dev'));
app.use("/api",apiRoutes);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, "..","build", "index.html"));
})


app.listen(port, function () {
  console.log("Server has been started on port " + port);
})


