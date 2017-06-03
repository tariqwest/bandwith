const models = require('../../db/models');

module.exports.update = (req, res) => {
  const profileBody = {
    first: req.body.first,
    last: req.body.last,
    zipCode: req.body.zipCode,
    gender: req.body.gender,
    bio: req.body.bio,
    song_url: req.body.song_url,
    video_url: req.body.video_url,
    age: req.body.age,
    searchRadius: req.body.searchRadius,
  };

  const userInstruments = req.body.instruments;

  const userGenres = req.body.genres;

  const userInfluences = req.body.influences;

  const preferredInstruments = req.body.preferred_instruments;

  const preferredGenres = req.body.preferred_genres;

  // make sure there are no blank fields because table insert will break
  const keys = Object.keys(profileBody);

  for (let i = 0; i < keys.length; i++) {
    if (profileBody[keys[i]] === '') {
      delete profileBody[keys[i]];
    }
  }

  // update the user profile table
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return profile.save(profileBody, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error((err) => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
