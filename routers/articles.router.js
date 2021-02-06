const express = require('express');
const {
  getAllArticles,
  getArticleByArticleId,
  patchArticle
} = require('../controllers/articles.controllers');
const {
  getCommentsByArticle,
  postComment
} = require('../controllers/comments.controllers');
const { handleMethodNotAllowed } = require('../controllers/errors.controllers');

const articlesRouter = express.Router();

articlesRouter.route('/').get(getAllArticles).all(handleMethodNotAllowed);
articlesRouter
  .route('/:article_id')
  .get(getArticleByArticleId)
  .patch(patchArticle)
  .all(handleMethodNotAllowed);
articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticle)
  .post(postComment)
  .all(handleMethodNotAllowed);

module.exports = articlesRouter;
