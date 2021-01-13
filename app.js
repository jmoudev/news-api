const express = require('express');
const app = express();
const apiRouter = require('./routers/api.router');
const {
  handleRouteNotFound,
  handleCustomErrors
} = require('./controllers/errors.controllers');

app.use(express.json());
app.use('/api', apiRouter);
app.all('/*', handleRouteNotFound);

app.use(handleCustomErrors);

module.exports = app;
