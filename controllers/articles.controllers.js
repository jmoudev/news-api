const {
  selectAllArticles,
  selectArticleByArticleId,
  updateArticle
} = require('../models/articles.models');

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;

  selectAllArticles(sort_by, order, author, topic)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleByArticleId(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticle(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};
