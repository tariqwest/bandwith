const models = require('../../models');
const { randomChoices } = require('./help');

module.exports = (profiles) => {
  let ids = profiles.map(profile => profile.id);
  ids = ids.slice(0, ids.length);
  console.log(ids);
  const indexesOne = randomChoices(ids, 15);
  console.log(indexesOne);
  const indexesTwo = randomChoices(ids, 15);
  console.log(indexesTwo);
 
  const connectionsInput = indexesOne.map((index, i) => ({
    profile_id_1: index,
    profile_id_2: indexesTwo[i],
    likes_1_2: true,
    likes_2_1: true,
  }))

  return Promise.all(connectionsInput.map(input => models.Connection.forge(input).save()));
};
