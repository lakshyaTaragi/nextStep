const mongoose = require('mongoose');

const InstituteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    website: String,
    image: String,
});

const Coaching = mongoose.model('Coaching', InstituteSchema);
const School = mongoose.model('School', InstituteSchema);
const College = mongoose.model('College', InstituteSchema);

module.exports = {
    Coaching,
    School,
    College
};