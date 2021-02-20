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
        //required: true
    },

    password:{
        type: String,
        required: true
    },
    
    hometown:{
        type: String,
        required: true
    },

    school:{
        type: ObjectId,
        ref: 'School',
        required: true
    },

    coaching:{
        type: ObjectId,
        ref: 'Coaching'
    },

    college:{
        type: ObjectId,
        ref: 'College'
    },

    profilePicture:{
        type: ObjectId,
        ref: 'Image',
    },

    myPosts: [{
        type: ObjectId,
        ref: 'Post'
    }],

    chatRooms:[{
        type:ObjectId,
        ref:'ChatRoom'
    }]

});

// Create a model of that schema
const User = mongoose.model('User',UserSchema);


// export the model
module.exports = User;