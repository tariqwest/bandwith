const models = require('../../db/models');

module.exports.update = (req, res, done) => {
  models.Connection.where({
    profile_id_1: req.body.userId,
    profile_id_2: req.body.profileId,
  }).fetch()
    .then((connection) => {
      if (connection) {
        throw connection;
      }
      return models.Connection.where({
        profile_id_2: req.body.userId,
        profile_id_1: req.body.profileId,
      }).fetch();
    })
    .then((connection) => {
      if (connection) {
        throw connection;
      }
      models.Connection.forge({
        profile_id_1: req.body.userId,
        profile_id_2: req.body.profileId,
        likes_1_2: req.body.choice,
      }).save()
        .then(() => {
          res.sendStatus(201);
          done();
        })
        .catch((err) => {
          done(err);
        });
    })
    .catch(() => {
      models.Connection.where({
        profile_id_1: req.body.userId,
        profile_id_2: req.body.profileId,
      }).save({ likes_1_2: req.body.choice },
      { method: 'update' })
        .then(() => {
          res.sendStatus(201);
          done();
        })
        .catch(() => {
          models.Connection.where({
            profile_id_2: req.body.userId,
            profile_id_1: req.body.profileId,
          }).save({ likes_2_1: req.body.choice },
          { method: 'update' })
            .then(() => {
              res.sendStatus(201);
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
    });
};
