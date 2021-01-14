const { createComment } = require('../models/comments.models');

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
