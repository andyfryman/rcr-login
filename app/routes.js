const passport = require('passport');
const express = require('express');

var router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
    res.json({
        name: req.user.displayName,
        email: req.user.emails[0].value,
        photo: req.user.photos[0].value,
    });
});

router.get('/auth/linkedin',
    passport.authenticate('linkedin', {
        scope: [
            'r_emailaddress',
            'r_liteprofile',
        ],
    })
);

router.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {
        successRedirect: '/profile',
        failureRedirect: '/login',
    })
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/linkedin');
}

module.exports = router;
