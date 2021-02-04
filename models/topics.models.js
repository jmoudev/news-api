const knex = require('../connection');

exports.selectAllTopics = () => knex('topics').select('*');
