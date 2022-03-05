const Comment = require('../models/comment');

const commentdata = [{
        "body": "",
    },

]
const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;