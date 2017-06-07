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
  'saxophone',
  'trumpet',
  'didgeridoo',
];

module.exports = () => Promise.all(instruments.map(instrument =>
  models.Instrument.forge({ instrument_name: instrument }).save()));
