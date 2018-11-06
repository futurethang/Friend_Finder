var express = require('express');
var path = require("path");
var router = express.Router();
var friends = require('../data/friends.json')
var fs = require("fs");

// Tell the server to parse JSON bodies in your requests:
const bodyParser = require("body-parser");
router.use(bodyParser.json()); // support json encoded bodies
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get("/api/friends", function (req, res) {
  // res.json(path.join(__dirname, "../data/friends.js"));
  return res.json(friends);
})

router.post("/api/friends", function (req, res) {
  // logid to add a new friend record
  var newFriend = req.body;
  console.log(req.body);
  // res.json(newFriend)

  try {
    const friends = JSON.parse(fs.readFileSync("app/data/friends.json"));
    console.log(friends);
    friends.friends.push(req.body); // This should be validated properly!
    fs.writeFileSync("app/data/friends.json", JSON.stringify(friends, null, 2));
    res.json(friends);
  } catch (err) {
    // JSON.parse or fs.writeFileSync might fail:
    throw err
  }
})

module.exports = router;