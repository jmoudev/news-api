const { selectEndpoints } = require('../models/api.models');
const endpoints = require('../api-list');

exports.getEndpoints = (req, res, next) => {
  return Promise()
    .then(() => {
      res.status(200).send({ endpoints });
    })
    .catch(next);
};
