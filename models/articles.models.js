const knex = require('../connection');
const { custom400Err, custom404Err } = require('./custom-errors');

exports.selectAllArticles = (
  sort_by = 'created_at',
  order = 'desc',
  author,
  topic
) => {
  if (order !== 'asc' && order !== 'desc') {
    return Promise.reject(custom400Err);
  }

  return knex('articles')
    .select('articles.*')
    .count({ comment_count: 'comments.comment_id' })
    .leftJoin('comments', { 'articles.article_id': 'comments.article_id' })
    .groupBy('articles.article_id')
    .orderBy(sort_by, order)
    .modify(query => {
      const filters = {};
      if (author) filters.author = author;
      if (topic) filters.topic = topic;

      query.where(filters);
    });
};

exports.selectArticleByArticleId = article_id => {
  return knex('articles')
    .select('articles.*')
    .where({ 'articles.article_id': article_id })
    .count({ comment_count: 'comments.comment_id' })
    .leftJoin('comments', { 'articles.article_id': 'comments.article_id' })
    .groupBy('articles.article_id')
    .then(([article]) => {
      if (!article) return Promise.reject(custom404Err);
      else return article;
    });
};

exports.updateArticle = (article_id, inc_votes = 0) => {
  // to be flexible for future dev could not throw an error, therefore could default to zero

  return knex('articles')
    .where({ article_id })
    .increment({ votes: inc_votes })
    .returning('*')
    .then(([article]) => {
      if (!article) {
        return Promise.reject(custom404Err);
      } else return article;
    });
};
