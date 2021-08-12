const mongoose = require('mongoose');

//database connection
mongoose.connect('mongodb+srv://node:adminganteng@cluster0.wdyin.mongodb.net/securing-rest-apis-with-jwt?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { 
        console.log('MongoDB Connection Succeeded.') 
    }
    else { 
        console.log('Error in DB connection : ' + err) 
    }
});

require('../model/user');