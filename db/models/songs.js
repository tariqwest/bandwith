const db = require('../');

const Song = db.Model.extend({
  tableName: 'songs',
  user: () => this.belongsTo('User'),
});

module.exports = db.model('Song', Song);
