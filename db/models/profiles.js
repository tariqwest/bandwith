const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: () => this.hasMany('Auth'),
  song: () => this.hasOne('Song'),
  video: () => this.hasOne('Video'),
  photo: () => this.hasOne('Photo'),
  connections: () => this.hasMany('Connection'),
  chats: () => this.hasMany('Chat'),
  instruments: function() {
    return this.belongsToMany('Instrument', 'users_instruments');
  },
  genres: function() {
    return this.belongsToMany('Genre', 'users_genres');
  },
  influences: function() {
    return this.belongsToMany('Influence', 'users_influences');
  },
  preferred_instruments: function() {
    return this.belongsToMany('Instrument', 'preferred_instruments');
  },
  preferred_genres: function() {
    return this.belongsToMany('Genre', 'preferred_genres');
  },
});

module.exports = db.model('Profile', Profile);
