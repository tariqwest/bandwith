const db = require('../');

const Video = db.Model.extend({
  tableName: 'videos',
  profile: () => this.belongsTo('Profile'),
});

module.exports = db.model('Video', Video);
