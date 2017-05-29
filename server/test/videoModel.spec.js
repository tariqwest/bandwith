const expect = require('chai').expect;
const Video = require('../../db/models/videos.js');

describe('Video Model', () => {
  it('Should be able to retrieve test data', (done) => {
    Video.forge({ video_url: 'http://testurl.com', profile_id: 1 }).save()
      .then((results) => {
        expect(results.get('id')).to.equal(1);
        expect(results.get('video_url')).to.equal('http://testurl.com');
        expect(results.get('profile_id')).to.equal(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should be able to delete a record', (done) => {
    Video.where({ id: 1 }).destroy()
      .then(() => Video.where({ id: 1 }).fetch())
      .then((result) => {
        expect(result).to.equal(null);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
