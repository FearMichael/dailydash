require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
// app.use(passport.session());


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/authenticate"
},
function(accessToken, refreshToken, profile, done) {
    // URLSearchParams.findOrCreate({googleId: profile.id}, function(err, user) {
    //     return done(err, user);
    // });
    return done(null, profile);
}
));

// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
//     app.listen(PORT, function() {
//         console.log(
//             "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//             PORT,
//             PORT
//         );
//     });
// });
db.sequelize.sync({force: true}).then(() => {
    app.listen(PORT, function() {
        console.log("Server listening on " + PORT);
    });
});

module.exports = app;
