//Express is used for the routes
var express = require("express");
var app = express();

//morgan is used for console logging
var morgan = require("morgan");

//body parser is used for get/post parsing
var bodyParser = require('body-parser');

//json web tokens for auth
var jwt = require("jsonwebtoken");


app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.json());


/**********************
* This area is for test data
*
**********************/
var user = {};
user.token = jwt.sign(user, 'testsecret');

//I think this is for authentication with tokens
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
});


app.get('*', function(request, response) {
  response.sendfile('./public/index.html');
});


//start the server
app.listen(8080);
console.log("App listening on port 8080");
