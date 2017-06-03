const models = require('../../models');

module.exports = (profiles) => {
  const ids = profiles.map(profile => profile.id);
  const connectionsInput = [
    {
      profile_id_1: ids[0],
      profile_id_2: ids[1],
      likes_1_2: true,
      likes_2_1: true,
    },
    {
      profile_id_1: ids[0],
      profile_id_2: ids[2],
      likes_1_2: true,
      likes_2_1: true,
    },
    {
      profile_id_1: ids[0],
      profile_id_2: ids[3],
      likes_1_2: true,
      likes_2_1: true,
    },
  ];
  return Promise.all(connectionsInput.map(input => models.Connection.forge(input).save()));
};
