const express = require('express');
const {
  getArticle,
  patchArticle
} = require('../controllers/articles.controllers');

const articlesRouter = express.Router();

articlesRouter.route('/:article_id').get(getArticle).patch(patchArticle);

module.exports = articlesRouter;
