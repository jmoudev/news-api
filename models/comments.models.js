const knex = require('../connection');

exports.createComment = (article_id, username, body) => {
  // console.log('here2');
  return knex('comments')
    .insert({ article_id, username, body })
    .returning('*')
    .then(([comment]) => ({ comment }));
};
