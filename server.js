var express = require("express");
var path = require("path");
var mysql = require("mysql");

var app = express();


app.use(require('./app/routing/apiRoutes'))
app.use(require('./app/routing/htmlRoutes'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('data'));
app.use('/static', express.static('public'));
app.use('/static', express.static('data'));

var PORT = process.env.PORT || 8080;




app.listen(PORT, function () {
  console.log("listening on port: http://localhost:" + PORT)
})