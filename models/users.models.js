const knex = require('../connection');
const { customErr404 } = require('../controllers/errors.controllers');

exports.selectUser = username => {
  return knex('users')
    .where({ username })
    .select('*')
    .then(([user]) => {
      if (!user) return customErr404();
      else return { user };
    });
};
