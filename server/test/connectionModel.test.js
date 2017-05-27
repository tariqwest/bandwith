const Connection = require('../../db/models/connections.js');

test('Should be able to retrieve test data', (done) => {
  Connection.forge({
    profile_id_1: 1,
    profile_id_2: 2,
    likes_1_2: true,
  }).save()
    .then(() => Connection.where({ id: 1 }).fetch())
    .then((results) => {
      expect(results.length).toBe(1);
      expect(results.at(0).get('id')).toBe(1);
      expect(results.at(0).get('profile_id_1')).toBe(1);
      expect(results.at(0).get('profile_id_2')).toBe(2);
      expect(results.at(0).get('likes_1_2')).toBe(true);
      expect(results.at(0).get('likes_2_1')).toBeNull();
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test('Should be able to update an already existing record', (done) => {
  Connection.where({ id: 1 }).fetch()
    .then((result) => {
      expect(result.get('id')).toBe(1);
    })
    .then(() => Connection.where({ id: 1 }).save({ likes_2_1: false }, { method: 'update' }))
    .then(() => Connection.where({ id: 1 }).fetch())
    .then((result) => {
      expect(result.get('likes_1_2')).toBe(true);
      expect(result.get('likes_2_1')).not.toBeNull();
      expect(result.get('likes_2_1')).toBe(false);
      done();
    })
    .catch((err) => {
      done(err);
    });
});

xtest('Should be able to delete a record', (done) => {
  Connection.where({ id: 1 }).destroy()
    .then(() => Connection.where({ id: 1 }).fetch())
    .then((result) => {
      expect(result).toBe(null);
      done();
    })
    .catch((err) => {
      done(err);
    });
});
