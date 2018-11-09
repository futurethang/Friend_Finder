var express = require('express');
var router = express.Router();
var friends = require('../data/friends.json')
var fs = require('fs');
let friendsData = require('../data/friends.js');

// Tell the server to parse JSON bodies in your requests:
const bodyParser = require("body-parser");
router.use(bodyParser.json()); // support json encoded bodies
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

///////////////// ROUTES ///////////////////////////////////
router.get("/api/friends", function (req, res) {
  return res.json(friends);
})

router.post("/api/friends", function (req, res, next) { // In which the new Friend is added to friends.json and compared to all other friend records for a best match
  var newFriend = req.body; // creates new friend and updates json file
  console.log(newFriend);
  // try { // Grab the friends.json content, append, and write back
  const friends = JSON.parse(fs.readFileSync("app/data/friends.json"));
  friends.friends.push(newFriend); // This should be validated properly!
  fs.writeFileSync("app/data/friends.json", JSON.stringify(friends, null, 2));
  // res.json(friends);
  
  // loop through friends.friends, excluding if matches newFriend.name 
  const friendComparisonScores = {}
  friends.friends.forEach((f) => {
    var currentIterateScore = f.scores;
    var newFriendScore = newFriend.scores;
    console.log(currentIterateScore + newFriendScore)
    // create object that lists {"name": matchScore} for each friend
    friendComparisonScores[f.name] = totalDifference(currentIterateScore, newFriendScore);
  })

  // ref to output the friend with lowest matchScore
  console.log(friendComparisonScores);
  bestFriend = findClosestScore(friendComparisonScores)
  console.log("best friend: " + findClosestScore(friendComparisonScores));
  res.send({"friend" : "test"});
})


//// HELPER FUNCTIONS
function totalDifference(arr1, arr2) { // compare new friend to all the existing friend objects
  var difference = 0;
  arr1.forEach((answer, index) => {
    difference += Math.abs(answer - arr2[index])
  });
  return difference;
}

function findClosestScore(myjson) {
  var keys = Object.keys(myjson),
    // set initial value as first elemnt in array
    result = keys[0];
  // iterate over array elements
  keys.forEach(function (v) {
    // compare with current property value and update with the min value property
    result = +myjson[result] > +myjson[v] ? v : result;
  });
  return result;
}

//// END HELPER FUNCTIONS

module.exports = router;