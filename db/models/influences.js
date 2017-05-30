const db = require('../');

const Influence = db.Model.extend({
  tableName: 'influences',
  profile: function() {
    return this.belongsToMany('Profile');
  },
});

module.exports = db.model('Influence', Influence);
