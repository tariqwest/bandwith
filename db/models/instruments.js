const db = require('../');

const Instrument = db.Model.extend({
  tableName: 'instruments',
  preference_user: () => this.belongsToMany('User'),
  choice_user: () => this.belongsToMany('User'),
});

module.exports = db.model('Instrument', Instrument);
