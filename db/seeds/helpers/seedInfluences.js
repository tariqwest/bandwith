const models = require('../../models');

const influences = [
  { name: 'Beyonce', img: 'https://s3.amazonaws.com/bit-photos/thumb/5445592.jpeg' },
  { name: 'Taylor Swift', img: 'https://s3.amazonaws.com/bit-photos/thumb/6015420.jpeg' },
  { name: 'Bob Dylan', img: 'https://s3.amazonaws.com/bit-photos/thumb/7431495.jpeg' },
  { name: 'Paul McCartney', img: 'https://s3.amazonaws.com/bit-photos/thumb/6115546.jpeg' },
  { name: 'Kanye West', img: 'https://s3.amazonaws.com/bit-photos/thumb/5119190.jpeg' },
  { name: 'Michael Jackson', img: 'https://s3.amazonaws.com/bit-photos/thumb/7710178.jpeg' },
  { name: 'David Bowie', img: 'https://s3.amazonaws.com/bit-photos/thumb/3923740.jpeg' },
  { name: 'Bob Marley', img: 'https://s3.amazonaws.com/bit-photos/thumb/7579001.jpeg' },
  { name: 'Jay-Z', img: 'https://s3.amazonaws.com/bit-photos/thumb/6971445.jpeg' },
  { name: 'Prince', img: 'https://s3.amazonaws.com/bit-photos/thumb/279000.jpeg' },
  { name: 'James Brown', img: 'https://s3.amazonaws.com/bit-photos/thumb/225554.jpeg' },
  { name: 'Lady Gaga', img: 'https://s3.amazonaws.com/bit-photos/thumb/7704822.jpeg' },
  { name: 'Parliament', img: 'https://s3.amazonaws.com/bit-photos/thumb/2431027.jpeg' },
];

module.exports = () => Promise.all(influences.map(influence =>
  models.Influence.forge({ influence_name: influence.name, influence_img: influence.img }).save()));
