const { Blog } = require('../models');

const postData = [
    {
        title: 'Test',
        content: 'testing 123.',
        user_id: 1,
    },
    {
        title: 'Testing this title',
        content: 'please work',
        user_id: 3,
    }
];

const seedpost = () => Blog.bulkCreate(postData);

module.exports = seedpost;
