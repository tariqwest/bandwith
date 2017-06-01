const models = require('../../db/models');

module.exports.getAll = (req, res, done) => {
  const store = [];

  models.Profile.where({ id: req.query.userId }).fetch({ withRelated: ['connections_1'] })
    .then((connections) => {
      connections.related('connections_1').models.map((connection) => {
        return connection;
      }).filter(connection => (
        connection.pivot.attributes.likes_1_2 && connection.pivot.attributes.likes_2_1
      )).forEach((match) => {
        store.push(match.attributes);
      });
    })
    .then(() => (
      models.Profile.where({ id: req.query.userId }).fetch({ withRelated: ['connections_2'] })
    ))
    .then((connections) => {
      connections.related('connections_2').models.map((connection) => {
        return connection;
      }).filter(connection => (
        connection.pivot.attributes.likes_1_2 && connection.pivot.attributes.likes_2_1
      )).forEach((match) => {
        store.push(match.attributes);
      });
    })
    .then(() => {
      res.send(store);
    })
    .catch((err) => {
      done(err);
    });
};
