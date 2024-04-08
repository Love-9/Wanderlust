const express = require('express');
const router = express.Router();
const User=require('../models/user');
const WrapAsync=require('../utils/WrapAsync');
const { route } = require('./listing');
const passport = require('passport');
const review = require('../models/review');
const { saveRedirectUrl } = require('../middleware.js');

const userController=require('../controllers/user.js');

router.route("/signup")
.get(userController.renderSignUpForm)
.post(WrapAsync(userController.signup))

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.login);


router


router

router.get("/logout",userController.logOut);
module.exports=router;
