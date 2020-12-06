const express = require('express');
const mongoose = require('mongoose');


const app = express();

const PORT = process.env.PORT || 5000;


// DB config
const db = require('./config/keys').MongoURI;
// Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));



// Landing page
app.get('/', (req, res) => {
    res.send('landing page');
});


const User = require('../model/users/User');


app.listen(PORT, console.log(`Server running on port ${PORT}`));