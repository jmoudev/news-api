exports.handleRouteNotFound = (req, res, next) => {
  next({ status: 404, msg: `Not Found - path: "${req.originalUrl}"` });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res
      .status(400)
      .send({ msg: `Bad Request - ${err.message.split(' - ')[1]}` });
  } else next(err);
};
