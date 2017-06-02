exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTableIfNotExists('profiles', (table) => {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('bio', 300).nullable();
      table.string('email', 100).nullable().unique();
      table.string('zipCode', 15).nullable();
      table.integer('searchRadius').nullable();
      table.integer('age').nullable();
      table.string('gender', 30).nullable();
      table.string('photo_src', 300).nullable();
      table.string('video_url', 300).nullable();
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
    knex.schema.createTable('connections', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('profile_id_1').references('profiles.id').onDelete('CASCADE');
      table.integer('profile_id_2').references('profiles.id').onDelete('CASCADE');
      table.boolean('likes_1_2').nullable();
      table.boolean('likes_2_1').nullable();
    }),
    knex.schema.createTable('chats', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('profile_id_to').references('profiles.id').onDelete('CASCADE');
      table.integer('profile_id_from').references('profiles.id').onDelete('CASCADE');
      table.string('message').notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('instruments', (table) => {
      table.increments('id').unsigned().primary();
      table.string('instrument_name', 20).notNullable().unique();
    }),
    knex.schema.createTable('genres', (table) => {
      table.increments('id').unsigned().primary();
      table.string('genre_name', 20).notNullable().unique();
    }),
    knex.schema.createTable('influences', (table) => {
      table.increments('id').unsigned().primary();
      table.string('influence_name', 20).notNullable().unique();
    }),
    knex.schema.createTable('users_instruments', (table) => {
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('instrument_id').references('instruments.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('users_genres', (table) => {
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('genre_id').references('genres.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('users_influences', (table) => {
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('influence_id').references('influences.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('preferred_instruments', (table) => {
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('instrument_id').references('instruments.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('preferred_genres', (table) => {
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('genre_id').references('genres.id').onDelete('CASCADE');
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles'),
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
