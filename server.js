var express = require("express");
var path = require("path");
var fs = require("fs");
var mysql = require("mysql");
var friends = require("./app/data/friends");

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


app.post("/survey", function (req, res) {
  // var data = {
  //   test: "test",
  //   test2: "test2"
  // }

  // fs.appendFile("app/data/friends.json", JSON.stringify(data), function (err) {
  //   if (err) throw err;
  //   console.log('complete');
  // })
})

app.listen(PORT, function () {
  console.log("listening on port: http://localhost:" + PORT)
})


var myData = {
  test: "test",
  test2: "test2"
}

fs.readFile('app/data/friends.json', 'utf-8', function(err, data) {
	if (err) throw err

  var arrayOfObjects = JSON.parse(data)
  arrayOfObjects.push(myData);
  arrayOfObjects.push(myData);
  arrayOfObjects.push(myData);
  console.log(arrayOfObjects);

  // fs.writeFile("app/data/friends.json", JSON.stringify(arrayOfObjects), function (err) {
  //   if (err) throw err;
  //   console.log('complete');
  // })
})

