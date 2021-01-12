exports.up = function (knex) {
  // console.log('creating articles table');

  return knex.schema.createTable('articles', articleTable => {
    articleTable.increments('article_id').primary();
    articleTable.string('title').notNullable();
    articleTable.text('body').notNullable();
    articleTable.integer('votes').defaultTo(0);
    articleTable.string('topic').references('topics.slug');
    articleTable.string('author').references('users.username');
    articleTable.timestamp('created_at').defaultTo(knex.fn.now()); // nchelp invalid inout when no created_at property
  });
};

exports.down = function (knex) {
  // console.log('dropping articles table');

  return knex.schema.dropTable('articles');
};
