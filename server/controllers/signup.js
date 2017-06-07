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

      for (let i = 0; i < req.body.instruments.length; i++) {
        models.Instrument.where({ instrument_name: req.body.instruments[i] }).fetch()
          .then((instrument) => {
            profile.instruments().attach(instrument);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    });

  // update the user_genres
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }

      for (let i = 0; i < req.body.genres.length; i++) {
        models.Genre.where({ genre_name: req.body.genres[i] }).fetch()
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

      for (let i = 0; i < req.body.preferred_instruments.length; i++) {
        models.Instrument.where({ instrument_name: req.body.preferred_instruments[i] }).fetch()
          .then((instrument) => {
            return profile.preferred_instruments().attach(instrument);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    });

  // update the preferred_genres
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      for (let i = 0; i < req.body.preferred_genres.length; i++) {
        models.Genre.where({ genre_name: req.body.preferred_genres[i] }).fetch()
          .then((genre) => {
            profile.preferred_genres().attach(genre);
          }).catch((err) => {
            res.status(500).send(err);
          });
      }
    });

  // update the user_influences
  for (let i = 0; i < req.body.influences.length; i++) {
    models.Influence.where({ influence_name: req.body.influences[i] }).fetch()
      .then((influence) => {
        if (!influence) {
          throw influence;
        } else {
          return influence;
        }
      })
      .catch(() => (
        models.Influence.forge({ influence_name: req.body.influences[i] }).save()
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
