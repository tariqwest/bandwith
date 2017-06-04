const models = require('../../db/models');

module.exports.search = (req, res) => {
  models.Profile.where({ id: req.query.id }).fetch({
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
    const influences = profile.related('influences').map(i => i.attributes.id);
    const instruments = profile.related('instruments').map(i => i.attributes.id);
    const preferredInstruments = profile.related('preferred_instruments').map(p => p.attributes.id);
    const genres = profile.related('genres').map(g => g.attributes.id);
    const preferredGenres = profile.related('preferred_genres').map(g => g.attributes.id);
    const fullInfo = Object.assign(profile.attributes,
      { influences, instruments, preferredInstruments, genres, preferredGenres });
    return fullInfo;
  })
  .then((profile) => {
    return models.Profile.fetchAll({
      withRelated: [

        {'instruments': (qb) => {
          qb.where('id', 'IN', profile.preferredInstruments);
        }},
        'preferred_instruments',

        {'genres': (qb) => {
          qb.where('id', 'IN', profile.preferredGenres);
        }},
        'preferred_genres',
      ],
    })
  })
  .then((results)=>{
    if (!results) {
      throw results;
    }
    console.log(results);
    res.status(200).json(results);
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

