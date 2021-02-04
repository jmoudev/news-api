const knex = require('../connection');
const { custom404Err } = require('./custom-errors');

exports.selectUser = username => {
  return knex('users')
    .where({ username })
    .select('*')
    .then(([user]) => {
      if (!user) return Promise.reject(custom404Err);
      else return user;
    });
};
