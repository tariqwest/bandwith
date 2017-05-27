const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: () => this.hasMany('Auth'),
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

module.exports = db.model('Profile', Profile);
