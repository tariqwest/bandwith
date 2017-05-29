const expect = require('chai').expect;
const Photo = require('../../db/models/photos.js');

describe('Photo Model', () => {
  it('Should be able to retrieve test data', (done) => {
    Photo.forge({ photo_src: 'test', profile_id: 1 }).save()
      .then(() => Photo.where({ id: 1 }).fetch())
      .then((results) => {
        expect(results.get('id')).to.equal(1);
        expect(results.get('photo_src')).to.equal('test');
        expect(results.get('profile_id')).to.equal(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should be able to delete a record', (done) => {
    Photo.where({ id: 1 }).destroy()
      .then(() => Photo.where({ id: 1 }).fetch())
      .then((result) => {
        expect(result).to.equal(null);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
