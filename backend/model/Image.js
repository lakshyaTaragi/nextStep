const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define the schema
const ImageSchema = new Schema({
    // meta_data: {}
    img:
    {
        data: Buffer,
        contentType: String
    }
});
//Buffer = data type for image, store our image as data in the form of arrays.

const Image = mongoose.model('Image',ImageSchema);
module.exports = Image;