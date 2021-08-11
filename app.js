
//import express
var express = require('express');

//import body parser
const bodyParser = require('body-parser');

//call database configuration
require('./config/database');

//create app express
var app = express();

//parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//auth routing to AuthController handler
const AuthController = require('./api/AuthController');
app.use('/api/auth', AuthController);

//user routing to UsersController handler
const UsersController = require('./api/UsersController');
app.use('/api/users', UsersController);

//Server listening port
var port = process.env.PORT || 3000;

//running server
app.listen(port, function() {
  console.log('Server listening on port ' + port);
});