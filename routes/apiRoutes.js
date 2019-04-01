require("dotenv").config({path: "../env"});
const db = require("../models");
const routes = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

//Routes object

// Get all examples
routes.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
        res.json(dbExamples);
    });
});

// Create a new example
routes.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
        res.json(dbExample);
    });
});

// Delete an example by id
routes.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
        res.json(dbExample);
    });
});

//Authentication
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_ID,
    callbackURL: "http://localhost:3000/authenticate"
},
function(accessToken, refreshToken, profile, done) {
    URLSearchParams.findOrCreate({googleId: profile.id}, function(err, user) {
        return done(err, user);
    });
}
));

routes.get("/auth/google",
    passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/plus.login"] }));

routes.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    function(req, res) {
        res.redirect("/authenticate");
    });

routes.get("/authenticate", function(req, res) {
    console.log(req.user);
    res.redirect("/");
});

module.exports = routes;
