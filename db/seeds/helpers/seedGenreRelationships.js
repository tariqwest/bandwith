const { randomChoices } = require('./help');

module.exports = ([profiles, genres]) =>
  Promise.all(profiles.map(profile => (
    Promise.all([
      profile.genres().attach(randomChoices(genres, 3)),
      profile.preferred_genres().attach(randomChoices(genres, 3)),
    ]))  // eslint-disable-line
  ));
