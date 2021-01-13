const knex = require('../connection');

exports.updateArticle = (article_id, inc_votes) => {
  return knex('articles')
    .select('votes')
    .where({ article_id })
    .then(([{ votes }]) => {
      votes += inc_votes;

      return knex('articles')
        .where({ article_id })
        .update({ votes })
        .returning('*');
    })
    .then(([article]) => ({ article }));
};
