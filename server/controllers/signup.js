const config = require('config');
const models = require('../../db/models');
const db = require('../../db');
const axios = require('axios');

module.exports.update = (req, res) => {
  const videoUrl = req.body.video_url.split('/');
  const query = videoUrl[videoUrl.length - 1].split('=');
  const id = query[query.length - 1];

  const profileBody = {
    first: req.body.first,
    last: req.body.last,
    zipcode: req.body.zipcode,
    gender: req.body.gender,
    bio: req.body.bio,
    photo_src: req.body.photo_src,
    song_url: req.body.song_url,
    video_url: id,
    age: req.body.age,
    search_radius: req.body.search_radius,
    has_profile: true,
  };

  // make sure there are no blank fields because table insert will break
  const keys = Object.keys(profileBody);

  for (let i = 0; i < keys.length; i++) {
    if (profileBody[keys[i]] === '') {
      delete profileBody[keys[i]];
    }
  }

  // Convert zipcode to geocoordinates for radius search
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${profileBody.zipcode}&key=${config.apiKeys.google}`)
    .then((response) => {
      const location = response.data.results[0].geometry.location;
      const geoUpdateQuery = `UPDATE profiles SET geo = ST_SetSRID(ST_Point(${location.lat}, ${location.lng}), 4326) WHERE id = ${req.body.id}`;
      return db.knex.raw(geoUpdateQuery);
    })
    .then((updated) => {
      if (!updated) {
        throw updated;
      }
    })
    .catch((err) => { console.log('Error with zipcode geocode or db update: ', err); });

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
    .catch((err) => {
      res.status(500).send(err);
    });

  // delete the user_instruments table
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return profile.instruments().detach({ profile_id: profile.attributes.id });
    })
    .catch((err) => {
      res.status(500).send(err);
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

// delete the user_genres table
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return profile.genres().detach({ profile_id: profile.attributes.id });
    })
    .then(() => {
    })
    .catch((err) => {
      res.status(500).send(err);
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
          }).catch((err) => {
            res.status(500).send(err);
          });
      }
    });

// delete the preferred_instruments table
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return profile.preferred_instruments().detach({ profile_id: profile.attributes.id });
    })
    .catch((err) => {
      res.status(500).send(err);
    });

  // update the preferred_instruments
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }

      for (let i = 0; i < req.body.preferred_instruments.length; i++) {
        models.Instrument.where({ instrument_name: req.body.preferred_instruments[i] }).fetch()
          .then(instrument => profile.preferred_instruments().attach(instrument))
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    });


  // delete the preferred_genres table
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return profile.preferred_genres().detach({ profile_id: profile.attributes.id });
    })
    .catch((err) => {
      res.status(500).send(err);
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

  // delete the influences table
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return profile.influences().detach({ profile_id: profile.attributes.id });
    })
    .catch((err) => {
      res.status(500).send(err);
    });

  // update the user_influences
  for (let i = 0; i < req.body.influences.length; i++) {
    models.Influence.where({ influence_name: req.body.influences[i].name }).fetch()
      .then((influence) => {
        if (!influence) {
          throw influence;
        } else {
          return influence;
        }
      })
      .catch(() => (
        models.Influence.forge({ influence_name: req.body.influences[i].name, influence_img: req.body.influences[i].img }).save()
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
