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
  const GetCoordinates = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${profileBody.zipcode}&key=${config.apiKeys.google}`)
    .then((response) => {
      const location = response.data.results[0].geometry.location;
      const geoUpdateQuery = `UPDATE profiles SET geo = ST_SetSRID(ST_Point(${location.lat}, ${location.lng}), 4326) WHERE id = ${req.body.id}`;
      return db.knex.raw(geoUpdateQuery);
    })
    .then((updated) => {
      if (!updated) {
        throw updated;
      }
    });

  const Profile = models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return profile;
    });

  // update the user profile table
  const SaveBasicProfile = Profile.then(p => p.save(profileBody, { method: 'update' }));

  // delete the user_instruments table
  const DeleteUserInstruments = Profile.tap(p => (
    p.instruments().detach({ profile_id: p.attributes.id })
  ));

  // update the user_instruments
  const SaveUserInstruments = DeleteUserInstruments.then(p => (
    Promise.all(instruments.map(instrument => (
      models.Instrument.where({ instrument_name: instrument }).fetch()
      .then((i) => { p.instruments().attach(i); })
    )))
  ));

  // delete the user_genres table
  const DeleteUserGenres = Profile.tap(p => (
    p.genres().detach({ profile_id: p.attributes.id })
  ));

  // update the user_genres
  const SaveUserGenres = DeleteUserGenres.then(p => (
    Promise.all(genres.map(genre => (
      models.Genre.where({ genre_name: genre }).fetch()
      .then((g) => { p.genres().attach(g); })
    )))
  ));

// delete the preferred_instruments table
  const DeletePreferredInstruments = Profile.tap(p => (
    p.preferred_instruments().detach({ profile_id: p.attributes.id })
  ));

  // update the preferred_instruments
  const SavePreferredInstruments = DeletePreferredInstruments.then(p => (
    Promise.all(preferredInstruments.map(preferredInstrument => (
      models.Instrument.where({ instrument_name: preferredInstrument }).fetch()
      .then((pI) => { p.preferred_instruments().attach(pI); })
    )))
  ));

  // delete the preferred_genres table
  const DeletePreferredGenres = Profile.tap(p => (
    p.preferred_genres().detach({ profile_id: p.attributes.id })
  ));

  // update the preferred_genres
  const SavePreferredGenres = DeletePreferredGenres.then(p => (
    Promise.all(preferredGenres.map(preferredGenre => (
      models.Genre.where({ genre_name: preferredGenre }).fetch()
      .then((pG) => { p.preferred_genres().attach(pG); })
    )))
  ));

  // delete the influences table
  const DeleteInfluences = Profile.tap(p => (
    p.influences().detach({ profile_id: p.attributes.id })
  ));

  // update the user_influences
  const SaveInfluences = DeleteInfluences.then(p => (
    Promise.all(influences.map(influence => (
      models.Influence.where({ influence_name: influence }).fetch()
      .then((i) => { p.influences().attach(i); })
    )))
  ));

  Promise.all([
    SaveBasicProfile,
    SaveUserInstruments,
    SaveUserGenres,
    SavePreferredInstruments,
    SavePreferredGenres,
    SaveInfluences,
    GetCoordinates,
  ])
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};
