const expect = require('chai').expect;
const Chat = require('../../db/models/chats.js');
const Profile = require('../../db/models/profiles.js');

describe('Chat Model', () => {
  it('should be able to retrieve test data', (done) => {
    Profile.forge({
      first: 'April',
      last: 'Ablon',
      display: 'aprilablon',
      email: 'ablonapril@gmail.com',
      phone: '415-123-4567',
      location: 'San Francisco',
      age: 23,
      searchRadius: 5,
    }).save()
      .then(() => {
        Profile.forge({
          first: 'Hosico',
          last: 'Cat',
          display: 'hosicocat',
          email: 'hosicocat@gmail.com',
          phone: '9876543210',
          location: 'Russia',
          age: 10,
          searchRadius: 5,
        }).save();
      })
      .then(() => (
        Chat.forge({
          profile_id_to: 1,
          profile_id_from: 2,
          message: 'hey, what\'s up?',
        }).save()
      ))
      .then((results) => {
        expect(results.get('id')).to.equal(1);
        expect(results.get('profile_id_to')).to.equal(1);
        expect(results.get('profile_id_from')).to.equal(2);
        expect(results.get('message')).to.equal('hey, what\'s up?');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should be able to delete a record', (done) => {
    Chat.where({ id: 1 }).destroy()
      .then(() => Chat.where({ id: 1 }).fetch())
      .then((result) => {
        expect(result).to.equal(null);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
