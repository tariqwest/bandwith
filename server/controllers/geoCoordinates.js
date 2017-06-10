

// Convert zipcode to geocoordinates for radius search
exports.getGeoCoordinates = (zipcode, profileId) => {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${config.apiKeys.google}`)
    .then((response) => {
      const location = response.data.results[0].geometry.location;
      const geoUpdateQuery = `UPDATE profiles SET geo = ST_SetSRID(ST_Point(${location.lat}, ${location.lng}), 4326) WHERE id = ${profileId}`;
      return db.knex.raw(geoUpdateQuery);
    })
    .then((updated) => {
      if (!updated) {
        throw updated;
      }
    })
    .catch((err) => { console.log('Error with zipcode geocode or db update: ', err); });
};
