const knex = require('../connection');

exports.selectAllTopics = () => {
    return knex('topics').select('*')
    // .then((topics) => {
    //     [console.log(topics)]
    // })
}