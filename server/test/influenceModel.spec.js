const expect = require('chai').expect;
const Influence = require('../../db/models/influences.js');

describe('Influence Model', () => {
  it('Should be able to retrieve test data', (done) => {
    Influence.forge({ influence_name: 'Trey Anastasio' }).save()
      .then((results) => {
        expect(results.get('id')).to.equal(1);
        expect(results.get('influence_name')).to.equal('Trey Anastasio');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should verify that all influence names are unique', (done) => {
    Influence.forge({ influence_name: 'Trey Anastasio' }).save()
      .then((result) => {
        done(new Error('was not supposed to succeed: ', result));
      })
      .catch((err) => {
        expect(err).to.be.an('error');
        done();
      });
  });

  it('Should be able to delete a record', (done) => {
    Influence.where({ id: 1 }).destroy()
      .then(() => Influence.where({ id: 1 }).fetch())
      .then((result) => {
        expect(result).to.equal(null);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
