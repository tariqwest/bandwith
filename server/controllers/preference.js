const models = require('../../db/models');

module.exports.update = (req, res, done) => {
  models.Connection.where({
    profile_id_1: req.body.userId,
    profile_id_2: req.body.profileId,
  }).fetch()
    .then((connection) => {
      console.log('first connection: ', connection);
      if (connection) {
        console.log('first if');
        throw connection;
      }
      return models.Connection.where({
        profile_id_2: req.body.userId,
        profile_id_1: req.body.profileId,
      }).fetch();
    })
    .then((connection) => {
      console.log('second connection: ', connection);
      if (connection) {
        console.log('second if');
        throw connection;
      }
      models.Connection.forge({
        profile_id_1: req.body.userId,
        profile_id_2: req.body.profileId,
        likes_1_2: req.body.choice,
      }).save()
        .then(() => {
          console.log('create new row')
          res.sendStatus(201);
          done();
        })
        .catch((err) => {
          done(err);
        });
    })
    .catch(() => {
      console.log('first catch');
      models.Connection.where({
        profile_id_1: req.body.userId,
        profile_id_2: req.body.profileId,
      }).save({ likes_1_2: req.body.choice },
      { method: 'update' })
        .then((row) => {
          console.log('first row updated: ', row);
          res.sendStatus(201);
          done();
        })
        .catch(() => {
          console.log('second catch');
          models.Connection.where({
            profile_id_2: req.body.userId,
            profile_id_1: req.body.profileId,
          }).save({ likes_2_1: req.body.choice },
          { method: 'update' })
            .then(() => {
              console.log('second row updated');
              res.sendStatus(201);
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
    });
};
