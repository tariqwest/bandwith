const { randomChoices } = require('./help');

module.exports = ([profiles, influences]) =>
  Promise.all(profiles.map(profile =>
    profile.influences().attach(randomChoices(influences, 3))));
