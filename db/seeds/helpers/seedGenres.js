const models = require('../../models');

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
];

module.exports = Promise.all(genres.map(genre =>
  models.Genre.forge({ genre_name: genre }).save()));
