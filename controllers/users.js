const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signupListing = async (req, res) => {

    try{
        let { username, email, password } = req.body;
        const newUser = new User({ username, email});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Successfully registered and logged in!");
            res.redirect("/listings");
        })
    } catch (error) {
        console.error("Error registering user:", error);
        req.flash("error", "Registration failed. Please try again.");
        return res.redirect("/signup");
    }
    
};

module.exports.loginUser = async(req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    req.flash("success", "Goodbye!");
    res.redirect("/listings");
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};
