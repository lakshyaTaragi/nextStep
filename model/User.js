const mongoose = require('mongoose');

// Define the schema
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }    
});

// Create a model of that schema
const User = mongoose.model('User',UserSchema);

// export the model
modules.exports = User;