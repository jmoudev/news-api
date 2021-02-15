const { selectUser } = require('../models/users.models');

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  selectUser(username)
    .then(user => {
      console.log(user);
      res.status(200).send({ user });
    })
    .catch(next);
};
