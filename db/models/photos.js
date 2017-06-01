const db = require('../');

const Photo = db.Model.extend({
  tableName: 'photos',
  profile: function() {
    return this.belongsTo('Profile');
  },
});

module.exports = db.model('Photo', Photo);
