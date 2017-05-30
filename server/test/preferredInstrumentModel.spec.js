const expect = require('chai').expect;
const Profile = require('../../db/models/profiles.js');
const Instrument = require('../../db/models/instruments.js');

describe('Preferred Instruments Join Table', () => {
  it('should be able to retrieve test data', (done) => {
    const instrument1 = new Instrument({ instrument_name: 'acoustic guitar' });
    const instrument2 = new Instrument({ instrument_name: 'bass guitar' });

    const expectedStore = {};

    Promise.all([instrument1.save(), instrument2.save()])
      .then(() => (
        Profile.forge({
          first: 'George',
          last: 'Washington',
          display: 'g.wash',
          email: 'g.wash@gmail.com',
          phone: '212-905-5996',
          location: 'Mount Vernon',
          age: 285,
          searchRadius: 5,
        }).save()
      ))
      .then((profile) => {
        profile.preferred_instruments().attach([instrument1, instrument2]);
      })
      .then(() => (
        Instrument.where({ instrument_name: 'acoustic guitar' }).fetch()
      ))
      .then((instrument) => {
        expectedStore['acoustic guitar'] = instrument.get('id');
      })
      .then(() => (
        Instrument.where({ instrument_name: 'bass guitar' }).fetch()
      ))
      .then((instrument) => {
        expectedStore['bass guitar'] = instrument.get('id');
      })
      .then(() => (
        Profile.where({ email: 'g.wash@gmail.com' }).fetch({ withRelated: ['preferred_instruments'] })
      ))
      .then((model) => {
        const actualStore = {};
        const results = model.related('preferred_instruments').models;

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
    Profile.where({ email: 'g.wash@gmail.com' }).fetch({ withRelated: ['preferred_instruments'] })
      .then(profile => (
        profile.preferred_instruments().detach()
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
