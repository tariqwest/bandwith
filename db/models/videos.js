const db = require('../');

const Video = db.Model.extend({
  tableName: 'videos',
  profile: function() {
    return this.belongsTo('Profile');
  },
});

module.exports = db.model('Video', Video);
