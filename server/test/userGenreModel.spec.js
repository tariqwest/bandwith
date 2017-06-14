const expect = require('chai').expect;
const Profile = require('../../db/models/profiles.js');
const Genre = require('../../db/models/genres.js');

describe('Users Genres Join Table', () => {
  it('should be able to retrieve test data', (done) => {
    const genre1 = new Genre({ genre_name: 'Blues' });
    const genre2 = new Genre({ genre_name: 'R&B' });

    const expectedStore = {};

    Promise.all([genre1.save(), genre2.save()])
      .then(() => (
        Profile.forge({
          first: 'Angelica',
          last: 'Schuyler',
          display: 'a.sky',
          email: 'a.sky@gmail.com',
          zipcode: 94103,
          age: 261,
          search_radius: 15,
        }).save()
      ))
      .then((profile) => {
        profile.genres().attach([genre1, genre2]);
      })
      .then(() => (
        Genre.where({ genre_name: 'Blues' }).fetch()
      ))
      .then((genre) => {
        expectedStore.Blues = genre.get('id');
      })
      .then(() => (
        Genre.where({ genre_name: 'R&B' }).fetch()
      ))
      .then((genre) => {
        expectedStore['R&B'] = genre.get('id');
      })
      .then(() => (
        Profile.where({ email: 'a.sky@gmail.com' }).fetch({ withRelated: ['genres'] })
      ))
      .then((model) => {
        const actualStore = {};
        const results = model.related('genres').models;

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
    Profile.where({ email: 'a.sky@gmail.com' }).fetch({ withRelated: ['genres'] })
      .then(profile => (
        profile.genres().detach()
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
