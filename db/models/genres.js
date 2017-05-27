const db = require('../');

const Genre = db.Model.extend({
  tableName: 'genres',
  preference_user: () => this.belongsToMany('User'),
  choice_user: () => this.belongsToMany('User'),
});

module.exports = db.model('Genre', Genre);
