const db = require('../');

const Photo = db.Model.extend({
  tableName: 'photos',
  profile: () => this.belongsTo('Profile'),
});

module.exports = db.model('Photo', Photo);
