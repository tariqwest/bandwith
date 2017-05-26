exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTableIfNotExists('profiles', (table) => {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('auths', (table) => {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('users', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name', 30).notNullable();
      table.string('location', 30).notNullable();
      table.integer('searchRadius').nullable();
      table.integer('age').nullable();
    }),
    knex.schema.createTable('photos', (table) => {
      table.increments('id').unsigned().primary();
      table.string('photo_src', 100).nullable();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('songs', (table) => {
      table.increments('id').unsigned().primary();
      table.string('song_url', 100).nullable();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('videos', (table) => {
      table.increments('id').unsigned().primary();
      table.string('video_url', 100).nullable();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('connections', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('user_id_1').references('users.id').onDelete('CASCADE');
      table.integer('user_id_2').references('users.id').onDelete('CASCADE');
      table.boolean('1_likes_2').nullable();
      table.boolean('2_likes_1').nullable();
    }),
    knex.schema.createTable('chats', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('user_id_to').references('users.id').onDelete('CASCADE');
      table.integer('user_id_from').references('users.id').onDelete('CASCADE');
      table.string('message').notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('instruments', (table) => {
      table.increments('id').unsigned().primary();
      table.string('instrument_name', 20).notNullable();
    }),
    knex.schema.createTable('genres', (table) => {
      table.increments('id').unsigned().primary();
      table.string('genre_name', 20).notNullable();
    }),
    knex.schema.createTable('influences', (table) => {
      table.increments('id').unsigned().primary();
      table.string('influence_name', 20).notNullable();
    }),
    knex.schema.createTable('usersInstruments', (table) => {
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('instrument_id').references('instruments.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('usersGenres', (table) => {
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('genre_id').references('genres.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('usersInfluences', (table) => {
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('influence_id').references('influences.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('preferredInstruments', (table) => {
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('instrument_id').references('instruments.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('preferredGenres', (table) => {
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('genre_id').references('genres.id').onDelete('CASCADE');
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('songs'),
    knex.schema.dropTable('videos'),
    knex.schema.dropTable('photos'),
    knex.schema.dropTable('connections'),
    knex.schema.dropTable('chats'),
    knex.schema.dropTable('instruments'),
    knex.schema.dropTable('genres'),
    knex.schema.dropTable('influences'),
    knex.schema.dropTable('usersInstruments'),
    knex.schema.dropTable('usersGenres'),
    knex.schema.dropTable('usersInfluences'),
    knex.schema.dropTable('preferredInstruments'),
    knex.schema.dropTable('preferredGenres'),
  ])
);
