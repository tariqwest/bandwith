const models = require('../../models');

const influences = [
  'Beyonce',
  'Taylor Swift',
  'Bob Dylan',
  'Paul McCartney',
  'Kanye',
  'Michael Jackson',
  'David Bowie',
  'Bob Marley',
  'Jay Z',
  'Prince',
];

module.exports = () => Promise.all(influences.map(influence =>
  models.Influence.forge({ influence_name: influence }).save()));
