const knex = require('../connection');
const { custom400Err, custom404Err } = require('./custom-errors');

exports.selectArticles = (
  article_id,
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
      if (article_id) filters['articles.article_id'] = article_id;
      if (author) filters.author = author;
      if (topic) filters.topic = topic;

      query.where(filters);
    })
    .then(articles => {
      if (!articles.length) return Promise.reject(custom404Err);

      articles.forEach(article => {
        article.comment_count = +article.comment_count;
      });

      if (article_id) {
        const [article] = articles;
        return article;
      } else return articles;
    });
};

exports.updateArticle = (article_id, inc_votes) => {
  // to be flexible for future dev could not throw an error, therefore could default to zero
  if (!inc_votes) {
    return Promise.reject(custom400Err);
  }

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
