var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User')
var authToken = require('../middleware/authToken');

//endpoint user profile using header token authentication
router.get('/profile/:id', authToken, (req, res) => {
    //check user id from database to get full user profile
    User.findById(req.params.id, (err, result) => {
        if (!err)
        res.send(JSON.stringify({"status": 200, "error": false, "response":result}));
    });
});

module.exports = router;