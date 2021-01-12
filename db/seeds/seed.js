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
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex('topics').insert(topicData).returning('*');
    })
    .then(topicRows => {
      return knex('users').insert(userData).returning('*');
    })
    .then(userRows => {
      const formattedArticles = formatArticlesData(articleData);
      return knex('articles').insert(formattedArticles).returning('*');
    })
    .then(articleRows => {
      // console.log(articleRows);

      // console.log(createArticleLookup(articleRows));
      // create references fro the username and article_id

      // changeUserKey;

      // username from comments.created_by / user.username
      // article_id for comments from the articles.title / comments.belongs_to

      return knex('comments').insert();
    });
};
