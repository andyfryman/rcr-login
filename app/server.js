const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const env = require('dotenv').config();
const routes = require('./routes.js');
const config = require('./config');

const app = express();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: config.secret,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new LinkedInStrategy({
    clientID: config.linkedinAuth.clientID,
    clientSecret: config.linkedinAuth.clientSecret,
    callbackURL: config.linkedinAuth.callbackURL,
    scope: [
        'r_emailaddress',
        'r_liteprofile',
    ],
    state: true,
}, (token, tokenSecret, profile, done) => {
    return done(null, profile);
}
));

app.use('/', routes);

app.listen(config.port, () => {
    console.log('App listening on port ' + config.port);
});
