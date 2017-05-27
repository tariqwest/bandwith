const db = require('../');

const Genre = db.Model.extend({
  tableName: 'genres',
  preference_profile: () => this.belongsToMany('Profile'),
  choice_profile: () => this.belongsToMany('Profile'),
});

module.exports = db.model('Genre', Genre);
