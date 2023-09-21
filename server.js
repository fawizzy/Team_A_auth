const express = require("express");
const session = require("express-session");
const passport = require("./config/passport-config");
const User = require("./models/user");
const { isLoggedIn } = require("./middlewares/isLoggedIn");

const app = express();
require("dotenv").config();

app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const renderSuccessPage = (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.render("success", { user });
  } else {
    res.redirect("/");
  }
};

app.get("/", isLoggedIn, function (req, res) {
  res.render("login");
});

app.get("/success",  renderSuccessPage);

app.get("/error", (req, res) => res.send("Error logging in"));

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    res.redirect("/success");
  }
);

app.get(
  "/auth/twitter",
  passport.authenticate("twitter", {
    scope: ["tweet.read", "users.read", "offline.access"],
  })
);

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/login",
    scope: ["tweet.read", "tweet.write", "users.read"],
  }),
  function (req, res) {
    res.redirect("/success");
  }
);

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/home");
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("App listening on port " + port));
