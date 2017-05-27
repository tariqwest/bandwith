const Photo = require('../../db/models/photos.js');

test('Should be able to retrieve test data', (done) => {
  Photo.forge({ photo_src: 'test', profile_id: 1 }).save()
    .then(() => Photo.where({ id: 1 }).fetch())
    .then((results) => {
      expect(results.length).toBe(1);
      expect(results.at(0).get('id')).toBe(1);
      expect(results.at(0).get('photo_src')).toBe('test');
      expect(results.at(0).get('profile_id')).toBe(1);
      done();
    })
    .catch((err) => {
      done(err);
    });
});

xtest('Should be able to delete a record', (done) => {
  Photo.where({ id: 1 }).destroy()
    .then(() => Photo.where({ id: 1 }).fetch())
    .then((result) => {
      expect(result).toBe(null);
      done();
    })
    .catch((err) => {
      done(err);
    });
});
