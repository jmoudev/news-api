const { selectAllTopics } = require('../models/topics.models')

const getAllTopics = (req, res, next) => {
    selectAllTopics().then((topics) =>
        res.send({ topics })
    )
}

module.exports = getAllTopics 