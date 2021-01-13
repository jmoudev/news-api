const express = require('express');
const { getUser } = require('../controllers/users.controllers');

const usersRouter = express.Router();

usersRouter.get('/:username', getUser);

module.exports = usersRouter;
