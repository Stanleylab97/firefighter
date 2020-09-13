const users = require("../facades/user.js");
const router = require("express").Router();
const middleware = require("../config/middleware");


 // Create a new User
    router.route("/register").post(users.create);

 // Login a User
    router.route("/login").post(users.login);

// Get  a User
router.route("/read").get(middleware.checkToken,users.getUser);

 //Update User
router.route("/update/:username").patch(middleware.checkToken,users.patch);

//Delete User
router.route("/delete/:username").delete(middleware.checkToken,users.delete);


module.exports=router;


