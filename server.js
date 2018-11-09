var express = require('express');
var path = require('path');
var fs = require('fs'); // NECESSARY????
var mysql = require('mysql'); // NECESSARY????
var friends = require('./app/data/friends'); // NECESSARY????
var apiRoutes = require('./app/routing/apiRoutes.js'); // NECESSARY????
var htmlRoutes = require('./app/routing/htmlRoutes.js'); // NECESSARY????
// var questions = require('./app/public/questions.js'); // NECESSARY????

var app = express();

app.use(require('./app/routing/apiRoutes'))
app.use(require('./app/routing/htmlRoutes'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // NECESSARY????
app.use(express.static('public')); // NECESSARY????
app.use(express.static('app/public'));
app.use(express.static('data'));

var PORT = process.env.PORT || 8080;

/////////////////////////// ROUTES ////////////////////////////////////////

app.get('/app/data/questions.js', function (req, res) { // NECESSARY FOR FRONT END TO RENDER???
  res.sendFile(path.join(__dirname, 'app/data', 'questions.js'));
});

app.get('api/friends', function (req, res) { // NECESSARY???? SAME IS IN API ROUTES
  // if (err) throw err;
  return res.json(path.join(__dirname, 'app/data', 'friends.json'));
})

app.get('routing/apiRoutes', function (req, res) { // NECESSARY????  ISN'T THIS WHY I 'REQUIRED' THE API FILE?
  return res.json(path.join(__dirname, 'app/data', 'friends.json'));
})

app.listen(PORT, function () {
  console.log("listening on port: http://localhost:" + PORT)
})
