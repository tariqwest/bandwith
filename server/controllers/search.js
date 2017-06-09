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
      withRelated: [
        'influences',
        'instruments',
        'preferred_instruments',
        'genres',
        'preferred_genres',
      ],
    });
  })
  .then((rawResults) => {
    if (!rawResults) {
      throw rawResults;
    }
    const results = [];
    rawResults.forEach((result) => {
      results.push(processProfileRelations(result));
    });
    return results;
  })
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
