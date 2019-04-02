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

routes.get("/news", function(req, res) {
    let news;
    let newsSearch = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS}`;
    axios.get(newsSearch).then(function(newsInfo) {
        news = newsInfo;
        console.log(news);
        res.json(news.data);
    });
    // const news = await apiCalls.news();
    // apiCalls.news().then(news => {
    //     console.log(news);
    //     res.json(news);
    // });
    // res.json(news);
    // console.log(news);
    // res.send(news);
});

//Authentication

routes.get("/auth/google",
    passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/plus.login"], session: false }));

// routes.get("/authenticate",
//     // passport.authenticate("google", { failureRedirect: "/" }),
//     function(req, res) {
//         console.log(req.body);
//         console.log(req.body.user);
//         // res.redirect("/authenticate");
//     });

routes.get("/authenticate", passport.authenticate("google", { failureRedirect: "/" }), function(req, res) {
    console.log(req.body);
    console.log(req.user);
    res.redirect("/");
});

module.exports = routes;
