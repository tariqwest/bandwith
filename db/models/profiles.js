const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths() {
    return this.hasMany('Auth');
  },
  connections_1() {
    return this.belongsToMany('Profile', 'connections', 'profile_id_1', 'profile_id_2').withPivot(['likes_1_2', 'likes_2_1']);
  },
  connections_2() {
    return this.belongsToMany('Profile', 'connections', 'profile_id_2', 'profile_id_1').withPivot(['likes_1_2', 'likes_2_1']);
  },
  chats() {
    return this.hasMany('Chat');
  },
  instruments() {
    return this.belongsToMany('Instrument', 'users_instruments');
  },
  genres() {
    return this.belongsToMany('Genre', 'users_genres');
  },
  influences() {
    return this.belongsToMany('Influence', 'users_influences');
  },
  preferred_instruments() {
    return this.belongsToMany('Instrument', 'preferred_instruments');
  },
  preferred_genres() {
    return this.belongsToMany('Genre', 'preferred_genres');
  },
});

module.exports = db.model('Profile', Profile);
