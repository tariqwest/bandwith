const db = require('../');

const Chat = db.Model.extend({
  tableName: 'chats',
  user_id_to: () => this.belongsTo('User'),
  user_id_from: () => this.belongsTo('User'),
});

module.exports = db.model('Chat', Chat);
