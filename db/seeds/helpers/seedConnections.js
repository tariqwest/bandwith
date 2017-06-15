const models = require('../../models');
const { randomChoices } = require('./help');

module.exports = (profiles) => {
  const ids = profiles.map(profile => profile.id);
  const indexesOne = randomChoices(ids, 10);
  const indexesTwo = randomChoices(ids, 10);
 
  const connectionsInput = indexesOne.map((index, i) => ({
    profile_id_1: ids[index],
    profile_id_2: ids[indexesTwo[i]],
    likes_1_2: true,
    likes_2_1: true,
  }));

  // const connectionsInput = [
  //   {
  //     profile_id_1: ids[0],
  //     profile_id_2: ids[1],
  //     likes_1_2: true,
  //     likes_2_1: true,
  //   },
  //   {
  //     profile_id_1: ids[0],
  //     profile_id_2: ids[2],
  //     likes_1_2: true,
  //     likes_2_1: true,
  //   },
  //   {
  //     profile_id_1: ids[0],
  //     profile_id_2: ids[3],
  //     likes_1_2: true,
  //     likes_2_1: true,
  //   },
  // ];
  return Promise.all(connectionsInput.map(input => models.Connection.forge(input).save()));
};
