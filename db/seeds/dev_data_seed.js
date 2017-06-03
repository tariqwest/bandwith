const {
  seedUsers,
  seedInstruments,
  seedGenres,
  seedAuth,
  seedInfluences,
  seedConnections,
  seedChats,
  seedInstrumentRelationships,
  seedInfluenceRelationships,
  seedGenreRelationships,
} = require('./helpers');

const profiles = seedUsers();
const instruments = seedInstruments();
const genres = seedGenres();
const influences = seedInfluences();

const auth = profiles.then(seedAuth);
const connections = profiles.then(seedConnections)
  .then(seedChats);

const influenceR = Promise.all([profiles, influences])
  .then(seedInfluenceRelationships);

const instrumentR = Promise.all([profiles, instruments])
  .then(seedInstrumentRelationships);

const genreR = Promise.all([profiles, genres])
  .then(seedGenreRelationships);

exports.seed = (knex, Promise) => Promise.all([
  profiles,
  instruments,
  genres,
  auth,
  influenceR,
  connections,
  instrumentR,
  genreR,
]);
