const models = require('../../db/models');

let currentUserProfile;
let currentMatchedProfiles;

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
  const twoMatchesOne = matchProfile[category].some((item) =>
  currentUserProfile[preference].includes(item));

  // Check if the current user has one of the match's desired instruments or genres
  const oneMatchesTwo = currentUserProfile[category].some((item) =>
  matchProfile[preference].includes(item));

  return twoMatchesOne && oneMatchesTwo;
};

const profileMatches = (profile) => {
  console.log('** Matching profile: ', currentUserProfile.display, ' with ', profile.display);
  const instrumentPrefsMatch = prefsMatch(profile, 'instruments', 'preferredInstruments');
  const genrePrefsMatch = prefsMatch(profile, 'genres', 'preferredGenres');
  console.log('** Instruments, Genres match: ', instrumentPrefsMatch, genrePrefsMatch);
  return instrumentPrefsMatch && genrePrefsMatch;
};

const deg2rad = deg => (deg * (Math.PI/180));

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
    (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2))
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in km
  return d * 0.62137119; // convert to miles
};

const locationMatches = (profile) => {
  const minSearchRadius = Math.min(profile.searchRadius, currentUserProfile.searchRadius);

  const distance = getDistanceFromLatLonInKm(
    currentUserProfile.lat,
    currentUserProfile.lng,
    profile.lat,
    profile.lng);

  return distance <= minSearchRadius;
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
  })
  .then((profile) => {
    if (!profile) {
      throw profile;
    }
    currentUserProfile = processProfileRelations(profile);
    return currentUserProfile;
  })
  .then((profile) => {
    models.Location.where({ zipcode: profile.zipCode }).fetch()
      .then((result) => {
        const location = {};
        for (var prop in result.attributes) {
          if (prop !== 'id' && prop !== 'zipcode') {
            location[prop] = result.attributes[prop];
          }
        }
        currentUserProfile = Object.assign(profile, location);
        console.log('currentUserProfile: ', currentUserProfile);
      });
  })
  .then(() => (
    models.Profile.fetchAll({
      withRelated: [
        'influences',
        'instruments',
        'preferred_instruments',
        'genres',
        'preferred_genres',
      ],
    })
  ))
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
  .then((matchedProfiles) => {
    currentMatchedProfiles = matchedProfiles;
    const connections = matchedProfiles.map((profile) => {
      return models.Connection.query({
        where:{
          profile_id_1: profile.id,
          profile_id_2: currentUserProfile.id,
        },
        orWhere: {
          profile_id_1: currentUserProfile.id,
          profile_id_2: profile.id,
        },
      })
      .fetch();
    });
    return Promise.all(connections);
  })
  .then((connections) => {
    console.log('** All connections: ', connections);
    connections.forEach((connection, i) => {
      if (connection) {
        console.log('** Connection: ', connection);
        console.log('** CurrentMatchedProfile: ', currentMatchedProfiles[i]);

        const conn = connection.serialize();

        if (conn.profile_id_1 === currentMatchedProfiles[i].id) {
          if (conn.likes_2_1 !== null) {
            currentMatchedProfiles.splice(i, 1);
          }
        }
        if (conn.profile_id_2 === currentMatchedProfiles[i].id) {
          if (conn.likes_1_2 !== null) {
            currentMatchedProfiles.splice(i, 1);
          }
        }
      }
    });
    return currentMatchedProfiles;
  })
  .then((connections) => {
    const connectionsWithLocation = connections.map((connection) => {
      return models.Location.where({ zipcode: connection.zipCode }).fetch()
        .then((result) => {
          const location = {};
          for (var prop in result.attributes) {
            if (prop !== 'id' && prop !== 'zipcode') {
              location[prop] = result.attributes[prop];
            }
          }
          return Object.assign(connection, location);
        })
        .catch((err) => {
          throw err;
        });
    });
    return Promise.all(connectionsWithLocation);
  })
  .then(connections => (
    connections.filter(connection => locationMatches(connection))
  ))
  .then((results) => {
    if (!results) {
      throw results;
    }
    res.status(200).send(results);
  })
  .error(err => res.status(500).send(err))
  .catch((err) => {
    console.log(err);
    res.sendStatus(404);
  });
};
