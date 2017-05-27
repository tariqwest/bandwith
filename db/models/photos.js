const db = require('../');

const Photo = db.Model.extend({
  tableName: 'photos',
  user: () => this.belongsTo('User'),
});

module.exports = db.model('Photo', Photo);
