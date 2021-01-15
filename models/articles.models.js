const knex = require('../connection');

exports.selectArticles = (
  article_id,
  sort_by = 'created_at',
  order = 'desc',
  author,
  topic
) => {
  if (order !== 'asc' && order !== 'desc') {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
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
      if (!articles.length)
        return Promise.reject({
          status: 404,
          msg: `Not Found`
        });

      articles.forEach(article => {
        article.comment_count = +article.comment_count;
      });

      if (article_id) {
        const [article] = articles;
        return { article };
      } else return { articles };
    });
};

exports.updateArticle = (article_id, inc_votes) => {
  return knex('articles')
    .where({ article_id })
    .increment({ votes: inc_votes })
    .returning('*')
    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `Not Found`
        });
      } else return { article };
    });
};
