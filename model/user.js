var mongoose = require('mongoose');  

//user schema or model database
var UserSchema = new mongoose.Schema({  
  name: String,
  gender: String,
  email: String,
  password: String
});


mongoose.model('User', UserSchema,'user');