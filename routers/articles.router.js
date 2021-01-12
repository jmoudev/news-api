const express = require('express');
const { patchArticle } = require('../controllers/articles.controllers');

const articlesRouter = express.Router();

articlesRouter.route('/:article_id').patch(patchArticle);

module.exports = articlesRouter;
