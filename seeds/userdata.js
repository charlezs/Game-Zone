const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [{
        username: 'veeditparikh',
        email: 'veedit@gmail.com',
        password: 'veedit@123'
    },

];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;