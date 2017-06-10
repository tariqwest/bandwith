const Promise = require('bluebird');
const models = require('../../db/models');
const config = require('config');
const db = require('../../db');
const axios = require('axios');

module.exports.update = (req, res) => {
  const videoUrl = req.body.video_url.split('/');
  const query = videoUrl[videoUrl.length - 1].split('=');
  const id = query[query.length - 1];
  const instruments = req.body.instruments;
  const genres = req.body.genres;
  const preferredInstruments = req.body.preferred_instruments;
  const preferredGenres = req.body.preferred_genres;
  const influences = req.body.influences;
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
  const keys = Object.keys(profileBody);

  // make sure there are no blank fields because table insert will break
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

  const Profile = models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
    });

  // update the user profile table
  const BasicProfile = Profile.then(p => p.save(profileBody, { method: 'update' }));

  // delete the user_instruments table
  const DeleteUserInstruments = Profile.then(p => (
    p.instruments().detach({ profile_id: p.attributes.id })
  ));

  // update the user_instruments
  const SaveUserInstruments = Profile.then(p => (
    Promise.All(instruments.map(instrument => (
      models.Instrument.where({ instrument_name: instrument }).fetch()
      .then((i) => { p.instruments().attach(i); })
    )))
  ));

  // delete the user_genres table
  const DeleteUserGenres = Profile.then(p => (
    p.genres().detach({ profile_id: p.attributes.id })
  ));

  // update the user_genres
  const SaveUserGenres = Profile.then(p => (
    Promise.All(genres.map(genre => (
      models.Genre.where({ genre_name: genre }).fetch()
      .then((g) => { p.genres().attach(g); })
    )))
  ));

// delete the preferred_instruments table
  const DeletePreferredInstruments = Profile.then(p => (
    p.preferred_instruments().detach({ profile_id: p.attributes.id })
  ));

  // update the preferred_instruments
  const SavePreferredInstruments = Profile.then(p => (
    Promise.All(preferredInstruments.map(preferredInstrument => (
      models.Instrument.where({ instrument_name: preferredInstrument }).fetch()
      .then((pI) => { p.preferred_instruments().attach(pI); })
    )))
  ));

  // delete the preferred_genres table
  const DeletePreferredGenres = Profile.then(p => (
    p.preferred_genres().detach({ profile_id: p.attributes.id })
  ));

  // update the preferred_genres
  const SavePreferredGenres = Profile.then(p => (
    Promise.All(preferredGenres.map(preferredGenre => (
      models.Genre.where({ genre_name: preferredGenre }).fetch()
      .then((pG) => { p.preferred_genres().attach(pG); })
    )))
  ));

  // delete the influences table
  const DeleteInfluences = Profile.then(p => (
    p.influences().detach({ profile_id: p.attributes.id })
  ));

  // update the user_influences
  const SaveInfluences = Profile.then(p => (
    Promise.All(influences.map(influence => (
      models.Influence.where({ influence }).fetch()
      .then((i) => { p.influences().attach(i); })
    )))
  ));

  Promise.All([])
};
