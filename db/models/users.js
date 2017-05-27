const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  song: () => this.hasOne('Song'),
  video: () => this.hasOne('Video'),
  photo: () => this.hasOne('Photo'),
  connections: () => this.hasMany('Connection'),
  chats: () => this.hasMany('Chat'),
  instruments: () => this.belongsToMany('Instrument'),
  genres: () => this.belongsToMany('Genre'),
  influences: () => this.belongsToMany('Influence'),
  preferred_instruments: () => this.belongsToMany('Instrument'),
  preferred_genres: () => this.belongsToMany('Genre'),
});

module.exports = db.model('User', User);
