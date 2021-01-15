const {
  selectCommentsByArticle,
  createComment,
  updateComment,
  removeComment
} = require('../models/comments.models');

exports.getCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;

  selectCommentsByArticle(article_id, sort_by, order)
    .then(comments => {
      res.status(200).send(comments);
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (!username || !body) {
    let msgEnd;

    if (!username && !body) msgEnd = 's: "username" and "body"';
    else if (!username) msgEnd = ': "username"';
    else msgEnd = ': "body"';

    next({
      status: 400,
      msg: `Bad Request - body missing required field${msgEnd}`
    });
  }

  createComment(article_id, username, body)
    .then(comment => {
      res.status(201).send(comment);
    })
    .catch(next);
};

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  updateComment(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send(comment);
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;

  removeComment(comment_id)
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
};
