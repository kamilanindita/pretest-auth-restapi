var jwt = require('jsonwebtoken'); 

//secret code used to generate jwt token
var secretToken = require('../config/secretToken');

function authToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.send(JSON.stringify({"status": 403, "error": true, "response": "No token provided"}));
  }

  // verifies secret and checks expires
  jwt.verify(token, secretToken.secret, (err, decoded) => {      
    if (err){ 
     return res.send(JSON.stringify({"status": 500, "error": true, "response": "Failed to authenticate token"}));
    }

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });

}

module.exports = authToken;