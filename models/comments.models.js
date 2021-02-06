const knex = require('../connection');
const { custom400Err, custom404Err } = require('./custom-errors');
const { selectArticles } = require('../models/articles.models');

exports.selectCommentsByArticle = (
  article_id,
  sort_by = 'created_at',
  order = 'desc'
) => {
  if (order !== 'asc' && order !== 'desc') {
    return Promise.reject(custom400Err);
  }

  // Error when trying to reuse selectArticles
  return knex('articles')
    .where({ article_id })
    .select('*')
    .then(articles => {
      if (!articles.length) {
        return Promise.reject(custom404Err);
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

      return comments;
    });
};

exports.createComment = (article_id, username, body) => {
  if (!username || !body) {
    return Promise.reject(custom400Err);
  }

  return knex('comments')
    .insert({ article_id, username, body })
    .returning('*')
    .then(([comment]) => {
      comment.author = comment.username;
      delete comment.username;

      return comment;
    });
};

exports.updateComment = (comment_id, inc_votes = 0) => {
  return knex('comments')
    .where({ comment_id })
    .increment({ votes: inc_votes })
    .returning('*')
    .then(([comment]) => comment);
};

exports.removeComment = comment_id => {
  return knex('comments').where({ comment_id }).del();
};
