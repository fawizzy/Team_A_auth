const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../models/user');

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

const GOOGLE_CLIENT_ID = '82645553900-lsdccvnavjj4o9de50ctcf08ecfleafp.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback',
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
  

module.exports = passport;
