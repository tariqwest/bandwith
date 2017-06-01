const models = require('../../db/models');

module.exports.getAll = (req, res, done) => {
  console.log('getting ALL connections... ', req.query);
  // create store for ids or user data
  const store = [];

  // query connections table for profile_id_1
  models.Connection.where({ profile_id_1: req.query.userId }).fetchAll({ withRelated: ['profile_id_2'] })
    .then((connections) => {
      console.log('profile 1 connections: ', connections);
      // push profile_id_2 value to store
      // store.concat(connections);
      // OR get related user info and push to store
    })
    .then(() => (
      // query connections table for profile_id_2
      models.Connection.where({ profile_id_2: req.query.userId }).fetchAll({ withRelated: ['profile_id_1'] })
    ))
    .then((connections) => {
      console.log('profile 2 connections: ', connections);
      // push profile_id_1 value to store
      // store.concat(connections);
      // OR get related user info and push to store
    })
    .catch((err) => {
      done(err);
    });

  // scenario 1 where we are only able to get user ids
  // query profiles table with all user ids
  res.sendStatus(200);
};
