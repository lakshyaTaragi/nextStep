const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// Define the schema
const UserSchema = new Schema({
    
    isMentor: {
        type: Boolean,
        required: true
    },
    
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
        required: true
    },

    school:{
        type: ObjectId,
        ref: 'Institute',
        required: true
    },

    coaching:{
        type: ObjectId,
        ref: 'Institute'
    },

    college:{
        type: ObjectId,
        ref: 'Institute'
    },
        

});

// Create a model of that schema
const User = mongoose.model('User',UserSchema);


// export the model
module.exports = User;