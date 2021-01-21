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

const articlesRouter = express.Router();

articlesRouter.route('/').get(getAllArticles);
articlesRouter
  .route('/:article_id')
  .get(getArticleByArticleId)
  .patch(patchArticle);
articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticle)
  .post(postComment);

module.exports = articlesRouter;
