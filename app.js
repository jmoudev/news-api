const express = require('express');
const app = express();
const apiRouter = require('./routers/api.router');

app.use(express.json());
console.log('before routing');
app.use('/api', apiRouter);
console.log('after routing');

module.exports = app;
