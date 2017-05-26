const knex = require('knex')(require('../knexfile'));
const db = require('bookshelf')(knex);

db.plugin('registry');

knex.schema.createTable('users', table => {
  table.increments('id').primary();
  table.string('name');
  table.string('location');
  table.integer('searchRadius');
  table.integer('age');
  table.timestamps();
});

knex.schema.createTable('songs', table => {
  table.increments('id').primary();
  table.string('song_url');
});

knex.schema.createTable('videos', table => {
  table.increments('id').primary();
  table.string('video_url');
});

let User = db.Model.extend({
  tableName: 'users',
  song: () => {
    return this.hasOne(Song);
  },
  video: () => {
    return this.hasOne(Video);
  }
});

let Song = db.Model.extend({
  tableName: 'songs',
  user: () => {
    return this.belongsTo(User);
  }
});

let Video = db.Model.extend({
  tableName: 'videos',
  user: () => {
    return this.belongsTo(User);
  }
});

module.exports = db;

