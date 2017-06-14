const expect = require('chai').expect;
const Profile = require('../../db/models/profiles.js');

describe('Profile Model', () => {
  it('Should be able to retrieve test data', (done) => {
    Profile.forge({
      first: 'Hosico',
      last: 'Cat',
      display: 'hosicocat',
      email: 'hosicocat@gmail.com',
      zipcode: 94103,
      age: 10,
      search_radius: 5,
    }).save()
      .then((results) => {
        expect(results.get('first')).to.equal('Hosico');
        expect(results.get('last')).to.equal('Cat');
        expect(results.get('display')).to.equal('hosicocat');
        expect(results.get('email')).to.equal('hosicocat@gmail.com');
        expect(results.get('zipcode')).to.equal(94103);
        expect(results.get('age')).to.equal(10);
        expect(results.get('search_radius')).to.equal(5);
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
      zipcode: 94103,
      age: 10,
      search_radius: 5,
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
        expect(result.get('zipcode')).to.equal(94103);
      })
      .then(() => Profile.where({ email: 'hosicocat@gmail.com' }).save({
        first: 'Luna',
        display: 'lunacat',
        email: 'lunacat@gmail.com',
        zipcode: 94103,
        age: 4,
      },
      { method: 'update' }))
      .then(() => Profile.where({ email: 'lunacat@gmail.com' }).fetch())
      .then((result) => {
        expect(result.get('first')).to.equal('Luna');
        expect(result.get('display')).to.equal('lunacat');
        expect(result.get('email')).to.equal('lunacat@gmail.com');
        expect(result.get('zipcode')).to.equal(94103);
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
