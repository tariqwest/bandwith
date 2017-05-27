const db = require('../');

const Song = db.Model.extend({
  tableName: 'songs',
  profile: () => this.belongsTo('Profile'),
});

module.exports = db.model('Song', Song);
