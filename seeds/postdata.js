const { Post } = require('../models');

const postdata = [{

}]

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;