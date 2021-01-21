const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const {
  formatArticlesData,
  formatCommentsData,
  createArticleLookup
} = require('../utils/data-manipulation');

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('topics').insert(topicData))
    .then(() => knex('users').insert(userData))
    .then(() => {
      const formattedArticles = formatArticlesData(articleData);

      return knex('articles').insert(formattedArticles).returning('*');
    })
    .then(articleRows => {
      const articleLookup = createArticleLookup(articleRows);
      const formattedCommentsData = formatCommentsData(
        commentData,
        articleLookup
      );

      return knex('comments').insert(formattedCommentsData);
    });
};
