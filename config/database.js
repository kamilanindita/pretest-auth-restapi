const mongoose = require('mongoose');

//database connection
mongoose.connect('mongodb://localhost:27017/securing-rest-apis-with-jwt', { useNewUrlParser: true }, (err) => {
    if (!err) { 
        console.log('MongoDB Connection Succeeded.') 
    }
    else { 
        console.log('Error in DB connection : ' + err) 
    }
});

require('../model/user');