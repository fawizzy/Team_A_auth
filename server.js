const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/success", (req, res) => res.send(userProfile));
app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
app.get("/", function (req, res) {
  res.render("login");
});

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID =
  "82645553900-lsdccvnavjj4o9de50ctcf08ecfleafp.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/success");
  }
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("App listening on port " + port));
