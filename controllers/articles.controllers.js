const { selectArticles, updateArticle } = require('../models/articles.models');

exports.getAllArticles = (req, res, next) => {
  const article_id = undefined;
  const { sort_by, order, author, topic } = req.query;

  selectArticles(article_id, sort_by, order, author, topic)
    .then(articles => {
      res.status(200).send(articles);
    })
    .catch(next);
};

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;

  selectArticles(article_id)
    .then(article => {
      res.status(200).send(article);
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  // to be flexible for future dev could not throw an error, therefore could default to zero
  if (!inc_votes)
    next({
      status: 400,
      msg: 'Bad Request - missing required field: "inc_votes"'
    });

  updateArticle(article_id, inc_votes)
    .then(article => {
      res.status(201).send(article);
    })
    .catch(next);
};
