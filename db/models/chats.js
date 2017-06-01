const db = require('../');

const Chat = db.Model.extend({
  tableName: 'chats',
  profile_id_to: function() {
    return this.belongsTo('Profile');
  },
  profile_id_from: function() {
    return this.belongsTo('Profile');
  },
});

module.exports = db.model('Chat', Chat);
