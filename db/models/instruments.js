const db = require('../');

const Instrument = db.Model.extend({
  tableName: 'instruments',
  preferenced_by: function() { return this.belongsToMany('Profile', 'preferred_instruments'); },
  player: function() { return this.belongsToMany('Profile', 'users_instruments'); },
});

module.exports = db.model('Instrument', Instrument);
