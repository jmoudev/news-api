const express = require('express');
const topicsRouter = express.Router();
const getAllTopics = require('../controllers/topics.controllers');
const { handleMethodNotAllowed } = require('../controllers/errors.controllers');

topicsRouter.route('/').get(getAllTopics).all(handleMethodNotAllowed);

module.exports = topicsRouter;
