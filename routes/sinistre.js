const sinistres = require("../facades/sinistre.js");
const multer = require("multer");
const passport = require('passport');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const router = require('express-promise-router')();


//Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    }, filename: (req, file, cb) => {
        cb(null, req.decoded.username + Date.now()+".jpg");
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
    fileFilter: fileFilter
}
);


// Create a new sinistre
router.route("/create").patch(passportJWT, upload.single("image"), sinistres.uploadImage);

// Get  single sinistre
router.route("/:id").get(passportJWT,sinistres.findOne);

//Get all sinistres
router.route("/").get(passportJWT, sinistres.getList);



module.exports = router;


