const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../config/passport');
const sinistres = require("../facades/sinistre.js");
const multer = require("multer");

const passportJWT = passport.authenticate('jwt', { session: false });


//const middleware = require('../config/middleware');



//Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../uploads");
    }, filename: (req, file, cb) => {
        cb(null, "IMG" + Date.now() + ".jpg");
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6,
    },
    //fileFilter: fileFilter
}
);	



// Create a new sinistre
router.route("/create").post(upload.single("imageUrl"), sinistres.uploadImage);

//Get all sinistres
router.route("/").get(sinistres.getList);

//Get all sinistres
router.route("/unread").get(sinistres.getUnread);

// Get  single sinistre
router.route("/:id").get(sinistres.findOne);

module.exports = router;


