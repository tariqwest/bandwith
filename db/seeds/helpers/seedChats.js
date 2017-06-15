const models = require('../../models');

module.exports = connections => (
  Promise.all(connections.map(connection =>
    Promise.all([
      models.Chat.forge({
        profile_id_to: connection.attributes.profile_id_1,
        profile_id_from: connection.attributes.profile_id_2,
        message: 'hi there',
      }).save(),
      models.Chat.forge({
        profile_id_to: connection.attributes.profile_id_2,
        profile_id_from: connection.attributes.profile_id_1,
        message: 'oh hey wassup',
      }).save(),
    ])
  ))
);
