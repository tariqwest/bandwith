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

  const userInstrumentKeys = Object.keys(req.body.instruments);
  const userGenreKeys = Object.keys(req.body.genres);
  const userInfluenceKeys = Object.keys(req.body.influences);
  const preferredInstrumentKeys = Object.keys(req.body.preferred_instruments);
  const preferredGenreKeys = Object.keys(req.body.preferred_genres);

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

  // update the user_instruments
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }

      for (let i = 0; i < userInstrumentKeys.length; i++) {
        models.Instrument.where({ instrument_name: userInstrumentKeys[i] }).fetch()
          .then((instrument) => {
            profile.instruments().attach(instrument);
          }).error((err) => {
            res.status(500).send(err);
          })
          .catch(() => {
            res.sendStatus(404);
          });
      }
    });

  // update the user_genres
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }

      for (let i = 0; i < userGenreKeys.length; i++) {
        models.Genre.where({ genre_name: userGenreKeys[i] }).fetch()
          .then((genre) => {
            profile.genres().attach(genre);
          }).error((err) => {
            res.status(500).send(err);
          })
          .catch(() => {
            res.sendStatus(404);
          });
      }
    });

  // update the preferred_instruments
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }

      for (let i = 0; i < preferredInstrumentKeys.length; i++) {
        models.Instrument.where({ instrument_name: preferredInstrumentKeys[i] }).fetch()
          .then((instrument) => {
            profile.preferred_instruments().attach(instrument);
          }).error((err) => {
            res.status(500).send(err);
          })
          .catch(() => {
            res.sendStatus(404);
          });
      }
    });

  // update the preferred_genres
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }

      for (let i = 0; i < preferredGenreKeys.length; i++) {
        models.Genre.where({ genre: preferredGenreKeys[i] }).fetch()
          .then((genre) => {
            profile.preferred_genres().attach(genre);
          }).error((err) => {
          })
          .catch(() => {
          });
      }
    });

  // update the user_influences
  for (let i = 0; i < userInfluenceKeys.length; i++) {
    models.Influence.where({ influence_name: userInfluenceKeys[i] }).fetch()
      .then((influence) => {
        if (!influence) {
          throw influence;
        } else {
          return influence;
        }
      })
      .catch(() => (
        models.Influence.forge({ influence_name: userInfluenceKeys[i] }).save()
      ))
      .then((influence) => {
        models.Profile.where({ id: req.body.id }).fetch()
          .then((profile) => {
            if (!profile) {
              throw profile;
            }

            profile.influences().attach(influence);
          });
      });
  }
};
