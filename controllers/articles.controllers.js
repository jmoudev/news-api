const { updateArticle } = require('../models/articles.models');

exports.patchArticle = (req, res, next) => {
  console.log(req.params);
  console.log('controller!!!');
  updateArticle().then(() => {
    res.status(201);
  });
};
