const db = require('../');

const Song = db.Model.extend({
  tableName: 'songs',
  profile: function() {
    return this.belongsTo('Profile');
  },
});

module.exports = db.model('Song', Song);
