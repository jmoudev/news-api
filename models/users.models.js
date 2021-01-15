const knex = require('../connection');

exports.selectUser = username => {
  return knex('users')
    .where({ username })
    .select('*')
    .then(([user]) => {
      if (!user)
        return Promise.reject({
          status: 404,
          msg: `Not Found`
        });
      else return { user };
    });
};
