const express = require('express');
const topicsRouter = require('./topics.router');
const usersRouter = require('./users.router');
const articlesRouter = require('./articles.router');

const apiRouter = express.Router();

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;
