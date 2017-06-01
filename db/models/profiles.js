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
  connections_1: function() {
    return this.belongsToMany('Profile', 'connections', 'profile_id_1', 'profile_id_2').withPivot(['likes_1_2', 'likes_2_1']);
  },
  connections_2: function() {
    return this.belongsToMany('Profile', 'connections', 'profile_id_2', 'profile_id_1').withPivot(['likes_1_2', 'likes_2_1']);
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
