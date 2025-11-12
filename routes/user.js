const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {savedRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");
    
const user = require("../models/user.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signupListing));

router.route("/login")
.get(userController.renderLoginForm)
.post(savedRedirectUrl,passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.loginUser);

router.get("/logout", userController.logoutUser);

module.exports = router;