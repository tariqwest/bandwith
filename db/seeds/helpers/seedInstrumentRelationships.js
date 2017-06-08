const { randomChoices } = require('./help');

module.exports = ([profiles, instruments]) =>
  Promise.all(profiles.map(profile => (
    Promise.all([
      profile.instruments().attach(randomChoices(instruments, 5)),
      profile.preferred_instruments().attach(randomChoices(instruments, 5)),
    ]))  // eslint-disable-line
  ));
