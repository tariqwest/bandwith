const Influence = require('../../db/models/influences.js');
const dbUtils = require('../../db/lib/utils.js');

// Deletes all tables, creates new tables, and seeds tables with test data
// beforeEach((done) => {
//   dbUtils.rollbackMigrate(done);
// });

// // Resets database back to original settings
// afterEach((done) => {
//   dbUtils.rollback(done);
// });

test('Should be able to retrieve test data', (done) => {
  Influence.forge().fetchAll()
      .then((results) => {
        expect(results.length).toBe(1);
        expect(results.at(0).get('id')).toBe(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
});

test('Should verify that all influence names are unique', (done) => {
  Influence.forge({
    influence_name: 'Trey Anastasio',
  }).save()
  .then((result) => {
    done(new Error('was not supposed to succeed: ', result));
  })
  .catch((err) => {
    expect(err).toBeDefined();
    done();
  });
});

test('Should be able to delete a record', (done) => {
  Influence.where({ id: 1 }).destroy()
    .then(() => Influence.where({ id: 1 }).fetch())
    .then((result) => {
      expect(result).toBe(null);
      done();
    })
    .catch((err) => {
      done(err);
    });
});
