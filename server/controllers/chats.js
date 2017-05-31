const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Chat
    .fetchAll()
    .then(chats => {
      res
        .status(200)
        .send(chats);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res
        .status(503)
        .send(err);
    });
};

module.exports.getAllForUserMatch = (req, res) => {
  models.Chat
    .query({
      where: {
        profile_id_to: req.query.userId,
        profile_id_from: req.query.matchUserId,
      },
      orWhere: {
        profile_id_to: req.query.matchUserId,
        profile_id_from: req.query.userId,
      }
    })
    .fetch()
    .then(chats => {
      res
        .status(200)
        .send(chats);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res
        .status(503)
        .send(err);
    });
};

module.exports.create = (req, res) => {
  new models.Chat({
    profile_id_to: req.body.matchUserId,
    profile_id_from: req.body.userId,
    message: req.body.message,
  })
    .save()
    .then(chat => {
      res
        .status(200)
        .send(chat);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res
        .status(503)
        .send(err);
    });
};
