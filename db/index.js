const knex = require('knex')(require('../knexfile'));
const db = require('bookshelf')(knex);

db.plugin('registry');

const User = db.Model.extend({
  tableName: 'users',
  song: () => this.hasOne(Song),
  video: () => this.hasOne(Video),
  photo: () => this.hasOne(Photo),
  connections: () => this.hasMany(Connection),
  chats: () => this.hasMany(Chat),
  instruments: () => this.belongsToMany(Instrument),
  genres: () => this.belongsToMany(Genre),
  influences: () => this.belongsToMany(Influence),
  preferred_instruments: () => this.belongsToMany(Instrument),
  preferred_genres: () => this.belongsToMany(Genre),
});

const Song = db.Model.extend({
  tableName: 'songs',
  user: () => this.belongsTo(User),
});

const Video = db.Model.extend({
  tableName: 'videos',
  user: () => this.belongsTo(User),
});

const Photo = db.Model.extend({
  tableName: 'photos',
  user: () => this.belongsTo(User),
});

const Connection = db.Model.extend({
  tableName: 'connections',
  user_id_1: () => this.belongsTo(User),
  user_id_2: () => this.belongsTo(User),
});

const Chat = db.Model.extend({
  tableName: 'chats',
  user_id_to: () => this.belongsTo(User),
  user_id_from: () => this.belongsTo(User),
});

const Instrument = db.Model.extend({
  tableName: 'instruments',
  preference_user: () => this.belongsToMany(User),
  choice_user: () => this.belongsToMany(User),
});

const Genre = db.Model.extend({
  tableName: 'genres',
  preference_user: () => this.belongsToMany(User),
  choice_user: () => this.belongsToMany(User),
});

const Influence = db.Model.extend({
  tableName: 'influences',
  user: () => this.belongsToMany(User),
});

module.exports = db;

