const expect = require('chai').expect;
const Connection = require('../../db/models/connections.js');

describe('Connection Model', () => {
  it('Should be able to retrieve test data', (done) => {
    Connection.forge({
      profile_id_1: 1,
      profile_id_2: 2,
      likes_1_2: true,
    }).save()
      .then(() => Connection.where({ id: 1 }).fetch())
      .then((results) => {
        expect(results.get('id')).to.equal(1);
        expect(results.get('profile_id_1')).to.equal(1);
        expect(results.get('profile_id_2')).to.equal(2);
        expect(results.get('likes_1_2')).to.equal(true);
        expect(results.get('likes_2_1')).to.equal(null);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should be able to update an already existing record', (done) => {
    Connection.where({ id: 1 }).fetch()
      .then((result) => {
        expect(result.get('id')).to.equal(1);
      })
      .then(() => Connection.where({ id: 1 }).save({ likes_2_1: false }, { method: 'update' }))
      .then(() => Connection.where({ id: 1 }).fetch())
      .then((result) => {
        expect(result.get('likes_1_2')).to.equal(true);
        expect(result.get('likes_2_1')).to.equal(false);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should be able to delete a record', (done) => {
    Connection.where({ id: 1 }).destroy()
      .then(() => Connection.where({ id: 1 }).fetch())
      .then((result) => {
        expect(result).to.equal(null);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
