const db = require('../');

const Instrument = db.Model.extend({
  tableName: 'instruments',
  preference: function() {
    return this.belongsToMany('Profile', 'preferred_instruments');
  },
  choice: function() {
    return this.belongsToMany('Profile', 'users_instruments');
  },
});

module.exports = db.model('Instrument', Instrument);
