const knex = require('knex')(require('../../knexfile'));

exports.rollbackMigrate = (done) => {
  knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest();
    })
    .then(() => {
      knex.seed.run();
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
};

exports.rollback = (done) => {
  knex.migrate.rollback()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
};
