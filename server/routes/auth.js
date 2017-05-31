const express = require('express');
const middleware = require('../middleware');
const path = require('path');

const router = express.Router();

router.route('/login')
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }));

router.route('/signup')
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true,
  }));

router.get('/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile'],
}));

router.get('/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/login',
}));

router.get('/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email'],
}));

router.get('/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/twitter', middleware.passport.authenticate('twitter'));

router.get('/twitter/callback', middleware.passport.authenticate('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/login',
}));

router.get('/status', (req, res) => {
  const user = req.user;
  const userId = user && user.id;
  res.send({ loggedIn: req.isAuthenticated(), userId });
});

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.send({ loggedOut: true });
  });

module.exports = router;
