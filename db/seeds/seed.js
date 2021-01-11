const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

const { formattedArticlesData, formatArticlesData } = require('../utils/data-manipulation');

exports.seed = function (knex) {
  return knex.migrate.rollback().then(() => {
    return knex.migrate.latest()
  }).then(() => {
    return knex('topics').insert(topicData).returning('*')
  }).then((topicRows) => {
    return knex('users').insert(userData).returning('*')
  }).then((userRows) => {
    const formattedArticles = formatArticlesData(articleData)
    return knex('articles').insert(formattedArticles).returning('*')
  }).then((articleRows) => {
    console.log(articleRows)
  })
}
