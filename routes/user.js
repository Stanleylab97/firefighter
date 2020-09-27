const passportConf = require('../config/passport');
const users = require("../facades/user.js");
const passport = require('passport');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const router = require('express-promise-router')();

router.route('/register').post(users.signUp);

router.route('/login').post(passportSignIn, users.signIn);

router.route('/signout').get(passportJWT, users.signOut);

router.route('/oauth/google').post(passport.authenticate('googleToken', { session: false }), users.googleOAuth);

router.route('/oauth/link/google').post(passportJWT, passport.authorize('googleToken', { session: false }), users.linkGoogle)

router.route('/oauth/unlink/google').post(passportJWT, users.unlinkGoogle);

router.route('/dashboard').get(passportJWT, users.dashboard);

router.route('/status').get(passportJWT, users.checkAuth);

router.route('/checkmail/:email').get(users.checkUserExist);


module.exports = router;


