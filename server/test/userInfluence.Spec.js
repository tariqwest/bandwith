const expect = require('chai').expect;
const Profile = require('../../db/models/profiles.js');
const Influence = require('../../db/models/influences.js');

describe('Users Influences Join Table', () => {
  it('should be able to retrieve test data', (done) => {
    const influence1 = new Influence({ influence_name: 'Tony Bennett' });
    const influence2 = new Influence({ influence_name: 'Elvis Presley' });

    const expectedStore = {};

    Promise.all([influence1.save(), influence2.save()])
      .then(() => (
        Profile.forge({
          first: 'Eliza',
          last: 'Schuyler',
          display: 'e.sky',
          email: 'e.sky@gmail.com',
          phone: '212-567-1262',
          location: 'Albany, New York',
          age: 260,
          searchRadius: 15,
        }).save()
      ))
      .then((profile) => {
        profile.influences().attach([influence1, influence2]);
      })
      .then(() => (
        Influence.where({ influence_name: 'Tony Bennett' }).fetch()
      ))
      .then((influence) => {
        expectedStore['Tony Bennett'] = influence.get('id');
      })
      .then(() => (
        Influence.where({ influence_name: 'Elvis Presley' }).fetch()
      ))
      .then((influence) => {
        expectedStore['Elvis Presley'] = influence.get('id');
      })
      .then(() => (
        Profile.where({ email: 'e.sky@gmail.com' }).fetch({ withRelated: ['influences'] })
      ))
      .then((model) => {
        const actualStore = {};
        const results = model.related('influences').models;

        results.forEach((result) => {
          actualStore[result.attributes.influence_name] = result.attributes.id;
        });

        expect(actualStore).to.deep.equal(expectedStore);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should be able to delete a record', (done) => {
    Profile.where({ email: 'e.sky@gmail.com' }).fetch({ withRelated: ['influences'] })
      .then(profile => (
        profile.influences().detach()
      ))
      .then((model) => {
        expect(model.length).to.equal(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
