const expect = require('chai').expect;
const Profile = require('../../db/models/profiles.js');
const Genre = require('../../db/models/genres.js');

describe('Preferred Genres Join Table', () => {
  it('should be able to retrieve test data', (done) => {
    const genre1 = new Genre({ genre_name: 'jazz' });
    const genre2 = new Genre({ genre_name: 'classical' });

    const expectedStore = {};

    Promise.all([genre1.save(), genre2.save()])
      .then(() => (
        Profile.forge({
          first: 'Benjamin',
          last: 'Franklin',
          display: 'b.frank',
          email: 'b.frank@gmail.com',
          zipcode: 94103,
          age: 311,
          search_radius: 10,
        }).save()
      ))
      .then((profile) => {
        profile.preferred_genres().attach([genre1, genre2]);
      })
      .then(() => (
        Genre.where({ genre_name: 'jazz' }).fetch()
      ))
      .then((genre) => {
        expectedStore.jazz = genre.get('id');
      })
      .then(() => (
        Genre.where({ genre_name: 'classical' }).fetch()
      ))
      .then((genre) => {
        expectedStore.classical = genre.get('id');
      })
      .then(() => (
        Profile.where({ email: 'b.frank@gmail.com' }).fetch({ withRelated: ['preferred_genres'] })
      ))
      .then((model) => {
        const actualStore = {};
        const results = model.related('preferred_genres').models;

        results.forEach((result) => {
          actualStore[result.attributes.genre_name] = result.attributes.id;
        });

        expect(actualStore).to.deep.equal(expectedStore);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should be able to delete a record', (done) => {
    Profile.where({ email: 'b.frank@gmail.com' }).fetch({ withRelated: ['preferred_genres'] })
      .then(profile => (
        profile.preferred_genres().detach()
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
