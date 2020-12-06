const mongoose = require('mongoose');

// Define the schema
const UserSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true
    },

    username:{
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
    },
    
    city:{
        type: String,
        required: true,
        school: {
            type: String,
            required: true
        }
    },

    coaching:{
        type: String,
        centre: {
            type: String
        },
    },
    

});

// Create a model of that schema
const User = mongoose.model('User',UserSchema);

// export the model
module.exports = User;