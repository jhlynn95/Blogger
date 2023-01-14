const { User } = require('../models');

const userData = [
    {
        username: 'testing',
        password: 'Testing',
    },
    {
        username: 'testing2',
        password: 'Testing2'
    },
    {
        username: 'testing3',
        password: 'Testing3'
    }
];

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUser;