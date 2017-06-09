const models = require('../../db/models');
const db = require('../../db');

const findMatchQuery = userId =>
  `
  SELECT DISTINCT ID FROM
    (SELECT
      PROFILES.ID,
      PROFILES.DISPLAY,
      PROFILES.GEO,
      PREFERRED_GENRES.GENRE_ID AS PREFERRED_GENRES_ID,
      PREFERRED_INSTRUMENTS.INSTRUMENT_ID AS PREFERRED_INSTRUMENTS_ID,
      USERS_INSTRUMENTS.INSTRUMENT_ID AS USER_INSTRUMENTS_ID,
      USERS_GENRES.GENRE_ID AS USER_GENRE_ID
    FROM PROFILES
      INNER JOIN PREFERRED_GENRES ON PROFILES.ID = PREFERRED_GENRES.PROFILE_ID
      INNER JOIN PREFERRED_INSTRUMENTS ON PROFILES.ID = PREFERRED_INSTRUMENTS.PROFILE_ID
      INNER JOIN USERS_GENRES ON  PROFILES.ID = USERS_GENRES.PROFILE_ID
      INNER JOIN USERS_INSTRUMENTS ON  PROFILES.ID = USERS_INSTRUMENTS.PROFILE_ID
    WHERE USERS_INSTRUMENTS.INSTRUMENT_ID IN (SELECT INSTRUMENT_ID FROM PREFERRED_INSTRUMENTS WHERE PROFILE_ID = ${userId})
    AND USERS_GENRES.GENRE_ID IN (SELECT GENRE_ID FROM PREFERRED_GENRES WHERE PROFILE_ID = ${userId})
    AND PROFILES.ID IN (SELECT PROFILES.ID FROM PROFILES WHERE ST_Distance_Sphere((SELECT PROFILES.GEO FROM PROFILES WHERE PROFILES.ID = ${userId}), PROFILES.GEO) <= (SELECT PROFILES.SEARCH_RADIUS FROM PROFILES WHERE PROFILES.ID = ${userId}) * 1609.34)
    )
  AS PROFILE_MATCHES
  `
;

const findConnectionsQuery = (userId, matchIds) =>
  `
  SELECT *
  FROM
    CONNECTIONS
  WHERE
    (profile_id_1 = 1
    AND profile_id_2 IN (${matchIds.toString()}))
  OR
    (profile_id_2 = 1
    AND profile_id_1 IN (${matchIds.toString()}))
  `
;

const processProfileRelations = (profile) => {
  const influences = profile.related('influences').map(i => i.attributes.influence_name);
  const instruments = profile.related('instruments').map(i => i.attributes.instrument_name);
  const preferredInstruments = profile.related('preferred_instruments').map(p => p.attributes.instrument_name);
  const genres = profile.related('genres').map(g => g.attributes.genre_name);
  const preferredGenres = profile.related('preferred_genres').map(g => g.attributes.genre_name);
  const fullInfo = Object.assign(profile.attributes,
    { influences, instruments, preferredInstruments, genres, preferredGenres });
  return fullInfo;
};

<<<<<<< HEAD
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
  const minSearchRadius = Math.min(profile.searchRadius, currentUserProfile.searchRadius) === 0 ?
  Math.max(profile.searchRadius, currentUserProfile.searchRadius) :
  Math.min(profile.searchRadius, currentUserProfile.searchRadius);

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
      });
  })
  .then(() => (
    models.Profile.fetchAll({
=======
module.exports.search = (req, res) => {
  let potentialMatches;
  let mutualMatches;
  db.knex.raw(findMatchQuery(req.query.userId))
  .then((results) => {
    if (!results) {
      throw results;
    }
    potentialMatches = results.rows.map(row => row.id);
    const matchesOfAllMatches = potentialMatches.map(userId =>
      db.knex.raw(findMatchQuery(userId)));
    return Promise.all(matchesOfAllMatches);
  })
  .then((matchesOfAllMatches) => {
    if (!matchesOfAllMatches) {
      throw matchesOfAllMatches;
    }
    mutualMatches = [];
    matchesOfAllMatches.forEach((match, i) => {
      const matchesOfMatch = match.rows.map(matchOfMatch => matchOfMatch.id);
      if (matchesOfMatch.includes(Number(req.query.userId))) {
        mutualMatches.push(potentialMatches[i]);
      }
    });
    return db.knex.raw(findConnectionsQuery(req.query.userId, mutualMatches));
  })
  .then((connections) => {
    connections.rows.forEach((connection) => {
      if (connection.profile_id_1 === Number(req.query.userId) && connection.likes_1_2 !== null) {
        mutualMatches = mutualMatches.filter(matchId => matchId !== connection.profile_id_2);
      }
      if (connection.profile_id_2 === Number(req.query.userId) && connection.likes_2_1 !== null) {
        mutualMatches = mutualMatches.filter(matchId => matchId !== connection.profile_id_1);
      }
    });
    return models.Profile.where('id', 'IN', mutualMatches).fetchAll({
>>>>>>> Refactor search to use raw sql queries instead of in-memory matching
      withRelated: [
        'influences',
        'instruments',
        'preferred_instruments',
        'genres',
        'preferred_genres',
      ],
<<<<<<< HEAD
    })
  ))
  .then((profiles) => {
    if (!profiles) {
      throw profiles;
=======
    });
  })
  .then((rawResults) => {
    if (!rawResults) {
      throw rawResults;
>>>>>>> Refactor search to use raw sql queries instead of in-memory matching
    }
    const results = [];
    rawResults.forEach((result) => {
      results.push(processProfileRelations(result));
    });
    return results;
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
  .then(connections => (
    connections.filter(connection => connection.email !== currentUserProfile.email)
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
