const locations = require('./lib/zipcodes');
const models = require('../models');

exports.seed = (knex, Promise) => (
  Promise.all(locations.map(location => models.Location.forge(location).save()))
);
