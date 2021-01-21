const knex = require('../connection');

exports.selectAllTopics = () => {
  return knex('topics').select('*');
};
