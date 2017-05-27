const db = require('../');

const Connection = db.Model.extend({
  tableName: 'connections',
  user_id_1: () => this.belongsTo('User'),
  user_id_2: () => this.belongsTo('User'),
});

module.exports = db.model('Connection', Connection);
