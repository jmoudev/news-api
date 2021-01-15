const knex = require('../connection');

exports.selectCommentsByArticle = (
  article_id,
  sort_by = 'created_at',
  order = 'desc'
) => {
  if (order !== 'asc' && order !== 'desc') {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }

  return knex('articles')
    .where({ article_id })
    .select('*')
    .then(articles => {
      if (!articles.length) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
      } else {
        return knex('articles')
          .where({ 'articles.article_id': article_id })
          .select('comments.*')
          .join('comments', { 'articles.article_id': 'comments.article_id' })
          .orderBy(sort_by, order);
      }
    })
    .then(comments => {
      comments.forEach(comment => {
        comment.author = comment.username;
        delete comment.username;
      });

      return { comments };
    });
};

exports.createComment = (article_id, username, body) => {
  return knex('comments')
    .insert({ article_id, username, body })
    .returning('*')
    .then(([comment]) => ({ comment }));
};

exports.updateComment = (comment_id, inc_votes = 0) => {
  return knex('comments')
    .where({ comment_id })
    .increment({ votes: inc_votes })
    .returning('*')
    .then(([comment]) => {
      console.log(comment);
      if (!comment) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
      }
      return { comment };
    });
};

exports.removeComment = comment_id => {
  console.log(comment_id);
  return knex('comments')
    .where({ comment_id })
    .del()
    .then(comment => {
      console.log(comment);
    });
};
