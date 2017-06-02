const models = require('../models');

const instruments = [
  'electric guitar',
  'acoustic guitar',
  'bass',
  'drums',
  'piano',
  'vocals',
  'ukulele',
  'violin',
  'saxaphone',
  'trumpet',
  'didgeridoo',
];

const genres = [
  'rock',
  'jazz',
  'blues',
  'folk',
  'reggae',
  'country',
  'pop',
  'punk',
  'metal',
  'edm',
  'r&b',
  'funk',
  'rap',
  'disco',
  'pop',
];

exports.seed = (knex, Promise) => {
  const instrumentPromise = Promise.all(instruments.map(instrument =>
    models.Instrument.forge({ instrument_name: instrument }).save()));

  const genrePromise = Promise.all(genres.map(genre =>
    models.Genre.forge({ genre_name: genre }).save()));

  Promise.all([instrumentPromise, genrePromise])
    .catch(err => console.warn(err));
};
