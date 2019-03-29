const db = require("../models");
const routes = require("express").Router();

//HTML routes 

// Load index page
routes.get("/", function(req, res) {
  db.Example.findAll({}).then(function(dbExamples) {
    res.render("index", { examples: dbExamples }
    );
  });
});

// Load example page and pass in an example by id
// app.get("/example/:id", function(req, res) {
//   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//     res.render("example", {
//       example: dbExample
//     });
//   });
// });

// Render 404 page for any unmatched routes
routes.get("*", function(req, res) {
  res.render("404");
});

//Export the routes object

module.exports = routes;
