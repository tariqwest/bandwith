const models = require('../../db/models');
const _ = require('underscore');

let currentUserProfile;

const processProfileRelations = (profile) => {
  const influences = profile.related('influences').map(i => i.attributes.id);
  const instruments = profile.related('instruments').map(i => i.attributes.id);
  const preferredInstruments = profile.related('preferred_instruments').map(p => p.attributes.id);
  const genres = profile.related('genres').map(g => g.attributes.id);
  const preferredGenres = profile.related('preferred_genres').map(g => g.attributes.id);
  const fullInfo = Object.assign(profile.attributes,
    { influences, instruments, preferredInstruments, genres, preferredGenres });
  return fullInfo;
};

const prefsMatch = (matchProfile, category, preference) => {
  // Check if the potential match has one of the current user's desired instruments or genres
  const matchLeft = _.any(matchProfile[category], (item) => {
    return _.contains(currentUserProfile[preference], item);
  });

  // Check if the current user has one of the match's desired instruments or genres
  const matchRight = _.any(currentUserProfile[category], (item) => {
    return _.contains(matchProfile[preference], item);
  });

  return matchLeft && matchRight;
};

const profileMatches = (profile) => {
  console.log('** Matching profile: ', currentUserProfile.display, ' with ', profile.display);
  const instrumentPrefsMatch = prefsMatch(profile, 'instruments', 'preferredInstruments');
  const genrePrefsMatch = prefsMatch(profile, 'genres', 'preferredGenres');
  console.log('** Instruments, Genres match: ', instrumentPrefsMatch, genrePrefsMatch);
  return (instrumentPrefsMatch && genrePrefsMatch);
};

module.exports.search = (req, res) => {
  models.Profile.where({ id: req.query.userId }).fetch({
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
    currentUserProfile = processProfileRelations(profile);
  })
  .then(() => {
    return models.Profile.fetchAll({
      withRelated: [
        'influences',
        'instruments',
        'preferred_instruments',
        'genres',
        'preferred_genres',
      ],
    });
  })
  .then((profiles) => {
    if (!profiles) {
      throw profiles;
    }
    const allProfiles = profiles.map((profile) => {
      return processProfileRelations(profile);
    });
    console.log('** All profiles: ', allProfiles.length);
    const matchedProfiles = [];
    allProfiles.forEach((profile) => {
      if (profileMatches(profile)) {
        matchedProfiles.push(profile);
      }
    });
    console.log('** Matched profiles: ', matchedProfiles.length);
    return matchedProfiles;
  })
  .then((results) => {
    if (!results) {
      throw results;
    }
    res.status(200).send(results);
  })
  .error(err => res.status(500).send(err))
  .catch(() => res.sendStatus(404));
};
