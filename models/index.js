const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
// const { Posts } = require('../controllers');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Comment.belongsTo(Post, {
    foreignKey: 'blog_id',
    onDelete: 'cascade'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});




module.exports = { User, Post, Comment };