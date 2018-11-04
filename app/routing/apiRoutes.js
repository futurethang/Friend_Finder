var express = require('express');
var path = require("path");
var router = express.Router();

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get("/api/friends", function (req, res) {
  return res.json(friends);
})

router.post("/api/friends", function (req, res) {
  // logid to add a new friend record
  
  res.json(newFriend)
})

module.exports = router;