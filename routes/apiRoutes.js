require("dotenv").config({path: "../env"});
const db = require("../models");
const routes = require("express").Router();
const passport = require("passport");
const apiCalls = require("./apiCalls");
const axios = require("axios");

//Routes object

// Get all examples
// routes.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//         res.json(dbExamples);
//     });
// });

// // Create a new example
// routes.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//         res.json(dbExample);
//     });
// });

// // Delete an example by id
// routes.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//         res.json(dbExample);
//     });
// });



//NEWS API

routes.get("/news", async function(req, res) {
    const news = await apiCalls.news();
    res.json(news);
});

//WEATHER API

routes.get("/weather/:zip", async function(req, res) {
    const weather = await apiCalls.weather(req.params.zip);
    res.json(weather);
});

//Authentication

routes.get("/auth/google",
    passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/plus.login"] }));

// routes.get("/authenticate",
//     // passport.authenticate("google", { failureRedirect: "/" }),
//     function(req, res) {
//         console.log(req.body);
//         console.log(req.body.user);
//         // res.redirect("/authenticate");
//     });

//Finds or Creates user once logged in
routes.get("/authenticate", passport.authenticate("google", { failureRedirect: "/", session: false }), function(req, res) {
    // console.log("---------------");
    // console.log(req.user);
    // console.log("---------------");
    db.User.findOrCreate({
        where: {authId: req.user.id},
        defaults: {
            familyName: req.user.name.familyName,
            givenName: req.user.name.givenName,
            picture: req.user.photos[0].value,
            gender: req.user._json.gender,
            locale: req.user._json.locale
        }
    })
        .then(([dbObject, created]) => {
            console.log(dbObject.get({plain: true}));
        });
    res.redirect("/");
});

module.exports = routes;
