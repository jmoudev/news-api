const express = require('express');
const {
  getArticle,
  patchArticle
} = require('../controllers/articles.controllers');
const { postComment } = require('../controllers/comments.controllers');

const articlesRouter = express.Router();

articlesRouter.route('/:article_id').get(getArticle).patch(patchArticle);
articlesRouter.route('/:article_id/comments').post(postComment);

module.exports = articlesRouter;
