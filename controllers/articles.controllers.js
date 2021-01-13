const { updateArticle } = require('../models/articles.models');

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticle(article_id, inc_votes).then(article =>
    res.status(201).send(article)
  );
};
