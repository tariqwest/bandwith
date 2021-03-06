const config = require('config');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient(config.env.redisUrl);

module.exports.verify = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  }
  return next();
};

const Store = new RedisStore({
  client: redisClient,
  url: config.env.redisUrl,
});

module.exports.Store = Store;

module.exports.session = session({
  store: Store,
  secret: 'more laughter, more love, more life',
  resave: true,
  saveUninitialized: true,
});
