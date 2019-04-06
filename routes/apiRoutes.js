require("dotenv").config({path: "../env"});
const db = require("../models");
const routes = require("express").Router();
const passport = require("passport");
const apiCalls = require("./apiCalls");
// const axios = require("axios");

//Routes object

//add notes to database
routes.post("/addtasks", function(req, res) {
    db.Task.create({
        text: req.body.task,
        completed: false,
        UserId: req.body.user
    }, {
        include: db.User
    }).then(function() {
        db.Task.findAll({where: {UserId: req.body.user}, raw: true}).then(function(allTasks) {
            res.json(allTasks);
        });
    });
});

//Get Tasks
routes.post("/gettasks", function(req, res) {
    db.Task.findAll({where: {UserId: req.body.user}, raw: true}).then(function(allTasks) {
        res.json(allTasks);
    });
});

//NEWS API

routes.post("/news", async function(req, res) {
    const news = await apiCalls.news(req.body.news);
    res.json(news);
});

//WEATHER API

routes.post("/weather", async function(req, res) {
    const weather = await apiCalls.weather(req.body.zip);
    res.json(weather);
});

//STOCK API

routes.post("/stock", async function(req, res) {
    const finance = await apiCalls.stocks(req.body.search);
    res.json(finance);
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
    res.redirect("/users" + req.user.id);
});

module.exports = routes;
