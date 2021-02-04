const express = require('express');
const { getUser } = require('../controllers/users.controllers');

const usersRouter = express.Router();

usersRouter.route('/:username').get(getUser);

module.exports = usersRouter;
