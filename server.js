var express = require('express');

var app = express();

app.use(require('./app/routing/apiRoutes'))
app.use(require('./app/routing/htmlRoutes'))
app.use(express.urlencoded({ extended: true }));
app.use(express.static('app/public'));

var PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log("listening on port: http://localhost:" + PORT)
})
