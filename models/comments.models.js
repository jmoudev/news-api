const knex = require('../connection');

exports.createComment = (article_id, username, body) => {
  return knex('comments')
    .insert({ article_id, username, body })
    .returning('*')
    .then(([comment]) => ({ comment }));
};
