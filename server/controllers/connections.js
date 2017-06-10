const models = require('../../db/models');

const processProfileRelations = (profile) => {
  const influences = profile.related('influences').map(i => i.attributes.influence_name);
  const instruments = profile.related('instruments').map(i => i.attributes.instrument_name);
  const preferredInstruments = profile.related('preferred_instruments').map(p => p.attributes.instrument_name);
  const genres = profile.related('genres').map(g => g.attributes.genre_name);
  const preferredGenres = profile.related('preferred_genres').map(g => g.attributes.genre_name);
  const fullInfo = Object.assign(profile.attributes,
    { influences, instruments, preferredInstruments, genres, preferredGenres });
  return fullInfo;
};

module.exports.getAll = (req, res, done) => {
  const allConnections = [];

  models.Profile.where({ id: req.query.userId }).fetch({ withRelated: ['connections_1'] })
    .then((connections) => {
      connections.related('connections_1').models.filter(connection => (
        connection.pivot.attributes.likes_1_2 && connection.pivot.attributes.likes_2_1
      )).forEach((match) => {
        allConnections.push(match.attributes);
      });
    })
    .then(() => (
      models.Profile.where({ id: req.query.userId }).fetch({ withRelated: ['connections_2'] })
    ))
    .then((connections) => {
      connections.related('connections_2').models.filter(connection => (
        connection.pivot.attributes.likes_1_2 && connection.pivot.attributes.likes_2_1
      )).forEach((match) => {
        allConnections.push(match.attributes);
      });
    })
    .then(() => {
      const connectionIds = allConnections.map(connection => connection.id);
      return models.Profile.where('id', 'IN', connectionIds).fetchAll({
        withRelated: [
          'influences',
          'instruments',
          'preferred_instruments',
          'genres',
          'preferred_genres',
        ],
      });
    })
    .then((rawConnections) => {
      const connections = rawConnections.map(connection => processProfileRelations(connection));
      res.send(connections);
    })
    .catch((err) => {
      done(err);
    });
};

