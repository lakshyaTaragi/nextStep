const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');




const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

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


// Routes
app.use('/auth', require('./routes/auth'));


app.listen(PORT, console.log(`Server running on port ${PORT}`));