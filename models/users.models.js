const knex = require('../connection');

exports.selectUser = username => {
  // console.log(user_id);
  return knex('users')
    .where({ username })
    .select('*')
    .then(([user]) => {
      if (!user)
        return Promise.reject({
          status: 404,
          msg: `Not Found - username: "${username}"`
        });
      else return { user };
    });
};
