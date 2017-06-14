const expect = require('chai').expect;
const Profile = require('../../db/models/profiles.js');
const Instrument = require('../../db/models/instruments.js');

describe('Users Instruments Join Table', () => {
  it('should be able to retrieve test data', (done) => {
    const instrument1 = new Instrument({ instrument_name: 'violin' });
    const instrument2 = new Instrument({ instrument_name: 'piano' });

    const expectedStore = {};

    Promise.all([instrument1.save(), instrument2.save()])
      .then(() => (
        Profile.forge({
          first: 'Luna',
          last: 'Cat',
          display: 'lunacat',
          email: 'lunacat@gmail.com',
          zipcode: 94103,
          age: 4,
          search_radius: 5,
        }).save()
      ))
      .then((profile) => {
        profile.instruments().attach([instrument1, instrument2]);
      })
      .then(() => (
        Instrument.where({ instrument_name: 'violin' }).fetch()
      ))
      .then((instrument) => {
        expectedStore.violin = instrument.get('id');
      })
      .then(() => (
        Instrument.where({ instrument_name: 'piano' }).fetch()
      ))
      .then((instrument) => {
        expectedStore.piano = instrument.get('id');
      })
      .then(() => (
        Profile.where({ email: 'lunacat@gmail.com' }).fetch({ withRelated: ['instruments'] })
      ))
      .then((model) => {
        const actualStore = {};
        const results = model.related('instruments').models;

        results.forEach((result) => {
          actualStore[result.attributes.instrument_name] = result.attributes.id;
        });

        expect(actualStore).to.deep.equal(expectedStore);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should be able to delete a record', (done) => {
    Profile.where({ email: 'lunacat@gmail.com' }).fetch({ withRelated: ['instruments'] })
      .then(profile => (
        profile.instruments().detach()
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
