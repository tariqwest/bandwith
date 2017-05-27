const Profile = require('../../db/models/profiles.js');
const dbUtils = require('../../db/lib/utils.js');

// Deletes all tables, creates new tables, and seeds tables with test data
beforeEach((done) => {
  dbUtils.rollbackMigrate(done);
});

// Resets database back to original settings
afterEach((done) => {
  dbUtils.rollback(done);
});

test('Should be able to retrieve test data', (done) => {
  Profile.forge().fetchAll()
      .then((results) => {
        expect(results.length).toBe(1);
        expect(results.at(0).get('id')).toBe(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
});

test('Should verify that all usernames are unique', (done) => {
  Profile.forge({
    first: 'System',
    last: 'Admin',
    display: 'Administrator',
    email: 'admin@domain.com',
    location: 'San Francisco',
    age: 32,
    searchRadius: 5,
  }).save()
  .then((result) => {
    done(new Error('was not supposed to succeed: ', result));
  })
  .catch((err) => {
    expect(err).toBeDefined();
    done();
  });
});

test('Should be able to update an already existing record', (done) => {
  Profile.where({ id: 1 }).fetch()
      .then((result) => {
        expect(result.get('id')).toBe(1);
      })
      .then(() => Profile.where({ id: 1 }).save({ first: 'James', last: 'Davenport' }, { method: 'update' }))
      .then(() => Profile.where({ id: 1 }).fetch())
      .then((result) => {
        expect(result.get('first')).toBe('James');
        expect(result.get('last')).toBe('Davenport');
        done();
      })
      .catch((err) => {
        done(err);
      });
});

test('Should be able to delete a record', (done) => {
  Profile.where({ id: 1 }).destroy()
    .then(() => Profile.where({ id: 1 }).fetch())
    .then((result) => {
      expect(result).toBe(null);
      done();
    })
    .catch((err) => {
      done(err);
    });
});
