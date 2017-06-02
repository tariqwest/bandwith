const {
  seedUsers,
  seedInstruments,
  seedGenres,
  seedAuth,
  seedInfluences,
  seedConnections,
  seedChats,
  seedInstrumentRelationships,
  seedGenreRelationships,
} = require('./helpers');

const profiles = seedUsers;
const instruments = seedInstruments;
const genres = seedGenres;

const auth = profiles.then(seedAuth);
// const influences = profiles.then(seedInfluences);
// const connections = profiles.then(seedConnections)
//   .then(seedChats);
//
// const instrumentR = Promise.all([profiles, instruments])
//   .then(seedInstrumentRelationships); // two tables
//
// const genreR = Promise.all([profiles, genres])
//   .then(seedGenreRelationships); // two tables

// Promise.all([influences, connections, instrumentR, genreR, auth]); //done

exports.seed = (knex, Promise) => Promise.all([profiles, instruments, genres, auth]);
