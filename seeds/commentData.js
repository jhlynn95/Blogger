const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'test. ',
        post_id: 1,
        user_id: 2,
    },
    {
        comment_text: 'This is a comment for a post.',
        post_id: 2,
        user_id: 1,
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;