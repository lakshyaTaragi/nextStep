const express = require('express');
const multer = require('multer');
const objectId = require('mongoose').Types.ObjectId;
// const fs = require('fs');
const storage = multer.memoryStorage();
const upload = multer({storage});



//Create router
const router = express.Router();

//Import mongo models
const Image = require('../../model/Image');
const User = require('../../model/User');

// GET request 
router.get('/show/:id', (req, res, next) => {
    Image.findById(req.params.id, (err, image) => { //!findById --> associated with profile picture   
        if(err) return next(err);
        res.contentType(image.img.contentType);
        res.send(image.img.data);
    });
});

// const uploadImage = (req, res) => {
//     upload.single('image')(req, res, () => {
//         console.log(req.file);
//         const image = new Image();
//         image.meta_data = req.file;
//         image.save()
//         .then(() => {
//             res.send({message:"uploaded successfully"});
//         });
//     });
// };

// POST request
// router.post('/create', uploadImage);
router.post('/create', upload.single('image'), (req, res, next) => {
    const image = new Image();
    image.img.data = req.file.buffer;
    image.img.contentType = "image/png";
    image.save().then(savedImage => {
        User.findOneAndUpdate(
            {username: req.body.username},
            {profilePicture: objectId(savedImage._id)},
            err => { if(err) throw err;}
        );
        res.send(true);
    });
});

// router.post('/create', upload.single('image'), (req, res, next) => {
//     const image = new Image();
//     console.log("upload request");
//     console.log(req.body);

//     image.img.data = req.file.image.buffer;
//     image.img.contentType = "image/png" || "image/jpeg" || "image/png";
//     // image.save(err => {
//     //     if(err) return next(err);
//     // });
//     // // ! update on the profile too 
// });




//Export router
module.exports = router;