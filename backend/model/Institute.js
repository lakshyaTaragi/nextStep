const mongoose = require('mongoose');

const InstituteSchema = new mongoose.Schema({
    name: String,
    city: String,
    website: String,
    image: String,
});

InstituteSchema.index( { name: "text", city: "text" } );
// School.stores.createIndex( { name: "text", description: "text" } );
// College.stores.createIndex( { name: "text", description: "text" } );

const Coaching = mongoose.model('Coaching', InstituteSchema);
const School = mongoose.model('School', InstituteSchema);
const College = mongoose.model('College', InstituteSchema);


module.exports = {
    Coaching,
    School,
    College
};