const expect = require('chai').expect;
const Genre = require('../../db/models/genres.js');

describe('Genre Model', () => {
  it('Should be able to retrieve test data', (done) => {
    Genre.forge({ genre_name: 'Jazz' }).save()
      .then((results) => {
        expect(results.get('id')).to.equal(1);
        expect(results.get('genre_name')).to.equal('Jazz');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should verify that all genre names are unique', (done) => {
    Genre.forge({ genre_name: 'Jazz' }).save()
      .then((result) => {
        done(new Error('was not supposed to succeed: ', result));
      })
      .catch((err) => {
        expect(err).to.be.an('error');
        done();
      });
  });

  it('Should be able to delete a record', (done) => {
    Genre.where({ id: 1 }).destroy()
      .then(() => Genre.where({ id: 1 }).fetch())
      .then((result) => {
        expect(result).to.equal(null);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
