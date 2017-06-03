const models = require('../../db/models');

module.exports.getAll = (req, res, done) => {
  const store = [];

  models.Profile.where({ id: req.query.userId }).fetch({ withRelated: ['connections_1'] })
    .then((connections) => {
      connections.related('connections_1').models.filter(connection => (
        connection.pivot.attributes.likes_1_2 && connection.pivot.attributes.likes_2_1
      )).forEach((match) => {
        store.push(match.attributes);
      });
    })
    .then(() => (
      models.Profile.where({ id: req.query.userId }).fetch({ withRelated: ['connections_2'] })
    ))
    .then((connections) => {
      connections.related('connections_2').models.filter(connection => (
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

module.exports.getOneWithRelations = (req, res, done) => {
  models.Profile.where({ id: req.query.userId }).fetch({ withRelated: ['instruments', 'genres', 'instruments'] })
    .then((profile) => {
      const profileInfo = profile.attributes;

      profileInfo.instruments = [];
      profileInfo.genres = [];
      profileInfo.influences = [];

      profile.related('instruments').models.forEach((model) => {
        profileInfo.instruments.push(model.attributes.instrument_name);
      });

      profile.related('genres').models.forEach((model) => {
        profileInfo.genres.push(model.attributes.genre_name);
      });

      profile.related('influences').models.forEach((model) => {
        profileInfo.influences.push(model.attributes.influence_name);
      });

      return profileInfo;
    })
    .then((profileInfo) => {
      res.send(profileInfo);
    })
    .catch((err) => {
      done(err);
    });
};
