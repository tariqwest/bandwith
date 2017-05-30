const expect = require('chai').expect;
const Profile = require('../../db/models/profiles.js');

describe('Profile Model', () => {
  it('Should be able to retrieve test data', (done) => {
    Profile.forge({
      first: 'Hosico',
      last: 'Cat',
      display: 'hosicocat',
      email: 'hosicocat@gmail.com',
      phone: '9876543210',
      location: 'Russia',
      age: 10,
      searchRadius: 5,
    }).save()
      .then((results) => {
        expect(results.get('first')).to.equal('Hosico');
        expect(results.get('last')).to.equal('Cat');
        expect(results.get('display')).to.equal('hosicocat');
        expect(results.get('email')).to.equal('hosicocat@gmail.com');
        expect(results.get('phone')).to.equal('9876543210');
        expect(results.get('location')).to.equal('Russia');
        expect(results.get('age')).to.equal(10);
        expect(results.get('searchRadius')).to.equal(5);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should verify that all usernames are unique', (done) => {
    Profile.forge({
      first: 'Hosico',
      last: 'Cat',
      display: 'hosicocat',
      email: 'hosicocat@gmail.com',
      phone: '9876543210',
      location: 'Russia',
      age: 10,
      searchRadius: 5,
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
    Profile.where({ email: 'hosicocat@gmail.com' }).fetch()
      .then((result) => {
        expect(result.get('phone')).to.equal('9876543210');
      })
      .then(() => Profile.where({ email: 'hosicocat@gmail.com' }).save({
        first: 'Luna',
        display: 'lunacat',
        email: 'lunacat@gmail.com',
        phone: '0412 345 678',
        location: 'Brisbane, Australia',
        age: 4,
      },
      { method: 'update' }))
      .then(() => Profile.where({ email: 'lunacat@gmail.com' }).fetch())
      .then((result) => {
        expect(result.get('first')).to.equal('Luna');
        expect(result.get('display')).to.equal('lunacat');
        expect(result.get('email')).to.equal('lunacat@gmail.com');
        expect(result.get('phone')).to.equal('0412 345 678');
        expect(result.get('location')).to.equal('Brisbane, Australia');
        expect(result.get('age')).to.equal(4);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should be able to delete a record', (done) => {
    Profile.where({ email: 'lunacat@gmail.com' }).destroy()
      .then(() => Profile.where({ email: 'lunacat@gmail.com' }).fetch())
      .then((result) => {
        expect(result).to.equal(null);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
