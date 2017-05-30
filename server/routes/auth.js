const express = require('express');
const middleware = require('../middleware');
const path = require('path');

const router = express.Router();

router.route('/auth/login')
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/auth/signup')
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile'],
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/login',
}));

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email'],
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/auth/twitter', middleware.passport.authenticate('twitter'));

router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/login',
}));

router.get('/auth/status', (req, res) => {
  res.send({ loggedIn: req.isAuthenticated(), userId: req.user.id || null });
});

router.route('/auth/logout')
  .get((req, res) => {
    req.logout();
    res.send({ loggedOut: true });
  });

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/dist', 'index.html'));
});

module.exports = router;
