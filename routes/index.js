var    express     = require("express");
var    router      = express.Router();
var    passport    = require("passport");
var    User        = require("../models/user");


// Root Route

router.get("/", function(req, res){
    res.render("landing");
});

//-------------------------
// Auth Routes
//-------------------------


//show register form
router.get("/register", function (req, res){
    res.render("register");
})

//handle signup logic
router.post("/register", function (req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user){
        if(err){
            req.flash("error",  err.message);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function (){
            req.flash("success", "Welcome to DSATM P I " + user.username);
            res.redirect("firms");
        });
    });
});

// show login form
router.get("/login", function(req, res){
    req.flash("error");
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/firms",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out !");
    res.redirect("/firms");
});


module.exports = router;