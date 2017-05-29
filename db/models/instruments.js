const db = require('../');

const Instrument = db.Model.extend({
  tableName: 'instruments',
  preferenced_by: () => this.belongsToMany('Profile'),
  player: () => this.belongsToMany('Profile'),
});

module.exports = db.model('Instrument', Instrument);
