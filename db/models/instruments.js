const db = require('../');

const Instrument = db.Model.extend({
  tableName: 'instruments',
  preference_profile: () => this.belongsToMany('Profile'),
  choice_profile: () => this.belongsToMany('Profile'),
});

module.exports = db.model('Instrument', Instrument);
