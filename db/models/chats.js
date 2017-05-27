const db = require('../');

const Chat = db.Model.extend({
  tableName: 'chats',
  profile_id_to: () => this.belongsTo('Profile'),
  profile_id_from: () => this.belongsTo('Profile'),
});

module.exports = db.model('Chat', Chat);
