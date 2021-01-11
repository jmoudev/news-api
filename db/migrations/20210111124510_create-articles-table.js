exports.up = function (knex) {
  console.log(' creating arcticles table');

  return knex.schema.createTable('articles', articleTable => {
    articleTable.increments('article_id').primary();
    articleTable.string('title').notNullable();
    articleTable.string('body').notNullable();
    articleTable.integer('votes').defaultTo(0);
    articleTable.string('topic').references('topics.slug');
    articleTable.string('author').references('users.username');
    articleTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  console.log('dropping arcticles table');

  return knex.schema.dropTable('articles');
};
