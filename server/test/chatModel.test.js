const Chat = require('../../db/models/chats.js');

test('Should be able to retrieve test data', (done) => {
  Chat.forge({
    profile_id_to: 1,
    profile_id_from: 2,
    message: 'hey, what\'s up?',
  }).save()
    .then(() => Chat.where({ id: 1 }).fetch())
    .then((results) => {
      expect(results.length).toBe(1);
      expect(results.at(0).get('id')).toBe(1);
      expect(results.at(0).get('profile_id_to')).toBe(1);
      expect(results.at(0).get('profile_id_from')).toBe(2);
      expect(results.at(0).get('message')).toBe('hey, what\'s up?');
      expect(results.at(0).get('created_at')).toBeDefined();
      expect(results.at(0).get('updated_at')).toBeDefined();
      done();
    })
    .catch((err) => {
      done(err);
    });
});

xtest('Should be able to delete a record', (done) => {
  Chat.where({ id: 1 }).destroy()
    .then(() => Chat.where({ id: 1 }).fetch())
    .then((result) => {
      expect(result).toBe(null);
      done();
    })
    .catch((err) => {
      done(err);
    });
});
