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
  var newFriend = req.body;
  // creates new friend and updates json file
  try {
    const friends = JSON.parse(fs.readFileSync("app/data/friends.json"));
    friends.friends.push(newFriend); // This should be validated properly!
    fs.writeFileSync("app/data/friends.json", JSON.stringify(friends, null, 2));
    res.json(friends);
  } catch (err) {
    // JSON.parse or fs.writeFileSync might fail:
    throw err
  }

  // loop through friends.friends, excluding if matches newFriend.name
  console.log("friends:");
  console.log(friends);
  friends.friends.forEach((f) => {
    var currentIterateScore = f.scores;
    var newFriendScore = newFriend.scores;
    var friendComparisonScores = {}
    // console.log(currentIterateScore);
    // console.log(newFriendScore);
    friendComparisonScores[f.name] = totalDifference(currentIterateScore,newFriendScore)
    console.log(friendComparisonScores);
  })
  // run the totalDiffence function, creates object that lists {"name": matchScore} for each friend
  // ref to output the friend with lowest matchScore

})


function totalDifference(arr1, arr2) { // compare new friend to all the existing friend objects
  var difference = 0;
  arr1.forEach((answer,index) => {
    difference += Math.abs(answer - arr2[index])
  });
  return difference;
}

module.exports = router;