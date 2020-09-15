const router = require("express").Router();
const middleware = require("../config/middleware");
const sinistres = require("../facades/sinistre.js");
const multer = require("multer");

//Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    }, filename: (req, file, cb) => {
        cb(null, req.decoded.username + ".jpg");
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
router.route("/create").patch(middleware.checkToken, upload.single("img"), sinistres.uploadImage);

// Get  single sinistre
router.route("/:id").get(middleware.checkToken,sinistres.findOne);

//Get all sinistres
router.route("/").patch(middleware.checkToken, sinistres.getList);



module.exports = router;


