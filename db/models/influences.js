const db = require('../');

const Influence = db.Model.extend({
  tableName: 'influences',
  user: () => this.belongsToMany('User'),
});

module.exports = db.model('Influence', Influence);
