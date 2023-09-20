const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const  TwitterStrategy  = require('@superfaceai/passport-twitter-oauth2');
const { User } = require('../models/user');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        where: { googleId: profile.id },
        defaults: {
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
          refreshToken: refreshToken,
          accessToken: accessToken,
        },
      })
        .then(([user, created]) => {
          return done(null, user);
        })
        .catch((error) => {
          return done(error, null);
        });
    }
  )
);



passport.use(
  new TwitterStrategy(
    {
      clientType: 'confidential',
      clientID: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/twitter/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        where: { twitterId: profile.id },
        defaults: {
          name: profile.displayName,
          email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
          avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
          refreshToken: refreshToken,
          accessToken: accessToken,
        },
      })
        .then(([user, created]) => {
          return done(null, user);
        })
        .catch((error) => {
          return done(error, null);
        });
    }
  )
);



module.exports = passport;
