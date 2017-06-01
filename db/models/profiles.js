const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  song: function() {
    return this.hasOne('Song');
  },
  video: function() {
    return this.hasOne('Video');
  },
  photo: function() {
    return this.hasOne('Photo');
  },
  connections: function() {
    return this.hasMany('Connection');
  },
  chats: function() {
    return this.hasMany('Chat');
  },
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
