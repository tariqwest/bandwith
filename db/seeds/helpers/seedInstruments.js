const models = require('../../models');

const instruments = [
  'electric guitar',
  'acoustic guitar',
  'bass',
  'drums',
  'piano',
  'vocals',
  'ukulele',
  'violin',
  'saxaphone',
  'trumpet',
  'didgeridoo',
];


module.exports = Promise.all(instruments.map(instrument =>
  models.Instrument.forge({ instrument_name: instrument }).save()));
