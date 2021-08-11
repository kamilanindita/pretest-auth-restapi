var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var secretToken = require('../config/secretToken'); 

//endpoint user authentication
router.post('/login', (req, res) => {
    //user query database
    User.findOne({ email : req.body.email }, (err, user) => {
        //check error query database
        if (err) {
            return res.send(JSON.stringify({"status": 500, "error": true, "response": "Error on the server"}));
        }

        //check if the user is not found
        if (!user) {
            return res.send(JSON.stringify({"status": 404, "error": true, "response": "No user found"}));
        }
        
        //check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.send(JSON.stringify({"status": 401, "error": true, "response": "Password incorrect"}));
        }
    
        //if user is found and password is valid, create a token
        var token = jwt.sign({ id: user._id }, secretToken.secret, {
          //expires in 1 hours
          expiresIn: 3600 
        });
    
        //return the information including token as JSON;
        var data={
            "_id":user._id,
            "name":user.name,
            "accessToken":token
        }
        res.send(JSON.stringify({"status": 200, "error": false, "response": data}));
    });
});

//endpoint add new user
router.post('/register', (req, res) => {
    //hashed user password
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    //create new user object
    var user = new User();
    user.name = req.body.name;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.password = hashedPassword;

    //save new user to database
    user.save((err, result) => {
        //check error
        if (!err){
            res.send(JSON.stringify({"status": 200, "error": false, "response": result}));
        }else{
            res.send(JSON.stringify({"status": 404, "error": true, "response": err})); 
        }
    }); 
});

module.exports = router;