const express = require('express');
const {
  patchComment,
  deleteComment
} = require('../controllers/comments.controllers');
const { handleMethodNotAllowed } = require('../controllers/errors.controllers');

const commentsRouter = express.Router();

commentsRouter
  .route('/:comment_id')
  .patch(patchComment)
  .delete(deleteComment)
  .all(handleMethodNotAllowed);

module.exports = commentsRouter;
