const model = require('../../db/seeds/instruments_seed.js');

test('adds instruments to instruments table', () => {
  expect(model.seedInstruments()).toBe(undefined);
});
