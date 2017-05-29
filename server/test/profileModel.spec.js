const expect = require('chai').expect;
const Profile = require('../../db/models/profiles.js');

describe('Profile Model', () => {
  it('Should be able to retrieve test data', (done) => {
    Profile.forge({
      first: 'Alexander',
      last: 'Hamilton',
      display: 'a.ham',
      email: 'a.ham@gmail.com',
      phone: '212-509-6995',
      location: 'New York, New York',
      age: 260,
      searchRadius: 5,
    }).save()
      .then((results) => {
        expect(results.get('first')).to.equal('Alexander');
        expect(results.get('last')).to.equal('Hamilton');
        expect(results.get('display')).to.equal('a.ham');
        expect(results.get('email')).to.equal('a.ham@gmail.com');
        expect(results.get('phone')).to.equal('212-509-6995');
        expect(results.get('location')).to.equal('New York, New York');
        expect(results.get('age')).to.equal(260);
        expect(results.get('searchRadius')).to.equal(5);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should verify that all usernames are unique', (done) => {
    Profile.forge({
      first: 'April',
      last: 'Ablon',
      display: 'aprilablon',
      email: 'ablonapril@gmail.com',
    }).save()
    .then((result) => {
      done(new Error('was not supposed to succeed: ', result));
    })
    .catch((err) => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('Should be able to update an already existing record', (done) => {
    Profile.where({ id: 1 }).fetch()
      .then((result) => {
        expect(result.get('id')).to.equal(1);
      })
      .then(() => Profile.where({ id: 1 }).save({ first: 'James', last: 'Davenport' }, { method: 'update' }))
      .then(() => Profile.where({ id: 1 }).fetch())
      .then((result) => {
        expect(result.get('first')).to.equal('James');
        expect(result.get('last')).to.equal('Davenport');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should be able to delete a record', (done) => {
    Profile.where({ id: 1 }).destroy()
      .then(() => Profile.where({ id: 1 }).fetch())
      .then((result) => {
        expect(result).to.equal(null);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
