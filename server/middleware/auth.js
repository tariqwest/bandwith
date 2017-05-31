const config = require('config');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();

module.exports.verify = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  }
  return next();
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    url: config.env.redisUrl,
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false,
});
