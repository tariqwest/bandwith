const db = require('../');

const Connection = db.Model.extend({
  tableName: 'connections',
  profile_id_1: () => this.belongsTo('Profile'),
  profile_id_2: () => this.belongsTo('Profile'),
});

module.exports = db.model('Connection', Connection);
