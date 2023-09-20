const express = require('express');
const session = require('express-session');
const passport = require('./config/passport-config');
const User = require('./models/user');
const app = express();

app.set('view engine', 'ejs');

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET',
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    //console.log(user); 
    res.render('success', { user });
  } else {
    res.redirect('/login');
  }
});



app.get('/error', (req, res) => res.send('Error logging in'));

app.get('/', function (req, res) {
  res.render('login');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    res.redirect('/success');
  }
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('App listening on port ' + port));
