const models = require('../../models');

module.exports = savedProfiles => Promise.all(savedProfiles.map(profile =>
  models.Auth.forge({
    type: 'local',
    password: 'admin123',
    profile_id: profile.get('id'),
  }).save()));
