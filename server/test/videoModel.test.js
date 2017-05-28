const Video = require('../../db/models/videos.js');
const dbUtils = require('../../db/lib/utils.js');

test('Should be able to retrieve test data', (done) => {
  Video.forge().fetchAll()
      .then((results) => {
        expect(results.length).toBe(1);
        expect(results.at(0).get('id')).toBe(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
});

test('Should be able to delete a record', (done) => {
  Video.where({ id: 1 }).destroy()
    .then(() => Video.where({ id: 1 }).fetch())
    .then((result) => {
      expect(result).toBe(null);
      done();
    })
    .catch((err) => {
      done(err);
    });
});
