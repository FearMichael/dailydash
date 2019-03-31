const db = require("../models");
const routes = require("express").Router();


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
app.get("/auth/google",
    passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/plus.login"] }));

app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function(req, res) {
        res.redirect("/");
    });


module.exports = routes;
