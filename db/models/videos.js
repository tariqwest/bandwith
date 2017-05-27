const db = require('../');

const Video = db.Model.extend({
  tableName: 'videos',
  user: () => this.belongsTo('User'),
});

module.exports = db.model('Video', Video);
