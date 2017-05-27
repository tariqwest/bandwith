const db = require('../');

const Influence = db.Model.extend({
  tableName: 'influences',
  profile: () => this.belongsToMany('Profile'),
});

module.exports = db.model('Influence', Influence);
