const endpoints = require('../api-list');

exports.getEndpoints = (req, res, next) => {
  res.status(200).send(endpoints);
};
