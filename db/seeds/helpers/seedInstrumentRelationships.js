const { randomChoices } = require('./help');

module.exports = ([profiles, instruments]) =>
  Promise.all(profiles.map(profile => (
    Promise.all([
      profile.instruments().attach(randomChoices(instruments, 2)),
      profile.preferred_instruments().attach(randomChoices(instruments, 2)),
    ]))  // eslint-disable-line
  ));
