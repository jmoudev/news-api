exports.handleRouteNotFound = (req, res, next) => {
  next({ status: 404, msg: `Not Found - path: "${req.originalUrl}"` });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePSQLErrors = (err, req, res, next) => {
  // console.log(err);
  if (err.code === '22P02') {
    res
      .status(400)
      .send({ msg: `Bad Request - ${err.message.split(' - ')[1]}` });
  } else if (err.code === '23503') {
    const errorMatch = err.detail.match(/\((\w+)\)/g);

    // console.log(errorMatch);

    if (errorMatch[0] === '(username)') {
      res.status(400).send({
        msg: `Bad Request - username: "${errorMatch[1].slice(
          1,
          -1
        )}" does not exist`
      });
    } else if (errorMatch[0] === '(article_id)') {
      res.status(404).send({
        msg: `Not Found - article_id: "${errorMatch[1].slice(1, -1)}"`
      });
    } else next(err);
  }
};
