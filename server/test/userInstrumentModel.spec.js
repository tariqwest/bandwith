const expect = require('chai').expect;
const Profile = require('../../db/models/profiles.js');
const Instrument = require('../../db/models/instruments.js');

describe('Users Instruments Join Table', () => {
  it('should be able to retrieve test data', (done) => {
    Instrument.forge({ instrument_name: 'violin' }).save()
      .then(() => {
        Instrument.forge({ instrument_name: 'piano' }).save();
      })
      .then(() => (
        // Profile.where({ id: 1 }).save({ instruments: })
        Profile.where({ id: 1 }).fetch({ withRelated: ['instruments'] })
      ))
      .then((result) => {
        expect(result).to.exist;
        console.log('join table result: ', result);
      })
      .catch((err) => {
        done(err);
      });
    // update instrument to have user
    // update user to have multiple instruments

    // assert instrument relationship with user
    // assert user relationship with instruments
  });

  it('should be able to delete a record', () => {
    // remove relationship
  });
});
