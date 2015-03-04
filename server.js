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

function ensureAuthorized(request, response, next) {
    var bearerToken;
    var bearerHeader = request.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        request.token = bearerToken;
        next();
    } else {
        response.send(403);
    }
}

app.get('/mez', ensureAuthorized, function(request, response) {
  response.json({
    firstName: "Tester",
    lastName: "Mc Testy",
    userID: "12345",
    emailAddress: "Test@users.com"
  });
});


app.post('/users/loginz', function(request, response) {
  console.log(request.body);
  if(request.body.emailAddress == 'email' && request.body.password == 'password') {
    response.json({
      token: user.token
    });
  }else{
    response.send(403);
  }
});




app.post('/users/registerz', function(request, response) {
  console.log(request.body);
  if(request.body.emailAddress == 'email' && request.body.password == 'password') {

  }else{

  }
});




//start the server
app.listen(8080);
console.log("App listening on port 8080");
