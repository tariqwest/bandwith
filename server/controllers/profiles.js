const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Profile.fetchAll()
    .then(profiles => res.status(200).send(profiles))
    .catch((err) => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

// module.exports.create = (req, res) => {
//   models.Profile.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

module.exports.getOne = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch({
    withRelated: [
      'influences',
      'instruments',
      'preferred_instruments',
      'genres',
      'preferred_genres',
    ],
  }).then((profile) => {
    if (!profile) {
      throw profile;
    }

    const influences = profile.related('influences').map(i => i.attributes.influence_name);
    const instruments = profile.related('instruments').map(i => i.attributes.instrument_name);
    const preferred_instruments = profile.related('preferred_instruments').map(p => p.attributes.instrument_name);
    const genres = profile.related('genres').map(g => g.attributes.genre_name);
    const preferred_genres = profile.related('preferred_genres').map(g => g.attributes.genre_name);

    const fullInfo = Object.assign(profile.attributes,
      { influences, instruments, preferred_instruments, genres, preferred_genres });

    res.status(200).send(fullInfo);
  })
  .error(err => res.status(500).send(err))
  .catch(() => res.sendStatus(404));
};

module.exports.update = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => res.sendStatus(201))
    .error(err => res.status(500).send(err))
    .catch(() => res.sendStatus(404));
};

// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
