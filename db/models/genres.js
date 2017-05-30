const db = require('../');

const Genre = db.Model.extend({
  tableName: 'genres',
  preference: function() {
    return this.belongsToMany('Profile', 'preferred_genres');
  },
  choice: function() {
    return this.belongsToMany('Profile', 'users_genres');
  },
});

module.exports = db.model('Genre', Genre);
