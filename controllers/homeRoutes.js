const router = require('express').Router();
const { User, Post, Comment } = require('../models');

const withAuth = require('../utils/auth');

// GET homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['comment_text'],
                    include: { 
                            model: User,
                            attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = dbPostData.map((Posts) =>
            Posts.get({ plain: true })
        );

        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET homepage click Posts
router.get('/homepage/post/:id', withAuth, async (req, res) => {
    const dbPostData = await Post.findByPk(req.params.id, {
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'createdAt', 'user_id', 'post_id', 'id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    });
    const Posts = dbPostData.get({ plain: true });

    res.render('single-post-home', {
        Posts,
        loggedIn: req.session.loggedIn,
    })
});

// GET user comment
router.get('/hompage/post/comment/:id', withAuth, async (req, res) => {
    const dbCommentData = await Comment.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    });
    const comment = dbCommentData.get({ plain: true });
    let postId = comment.posts_id;
    if(comment.user_id !== req.session.userId) {
        res.redirect(`/homepage/post/${postId}`);
        console.log('Only the user who created the comment can edit this comment.')
        return;
    }
    res.render('comment-edit', { comment, loggedIn: req.session.loggedIn })
})

// GET user Postss dashboard
router.get('/dashboard', async (req, res) => {
    try {
        if(!req.session.loggedIn) {
            console.log('Please log in or sign up to view dashboard.')
            res.redirect('/login')
            return;
        }
        console.log(req.session.userId)
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.userId,
            }
        });

        const Posts = dbPostData.map((Posts) => 
            Posts.get({ plain: true })
        );

        res.render('dashboard', { blogs: Posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET single post from dashboard
router.get('/dashboard/post/:id', withAuth, async (req, res) => {

    const dbPostData = await Post.findByPk(req.params.id);

    const posts = dbPostData.get({ plain: true })
    
    res.render('single-post-dashboard', { posts, loggedIn: req.session.loggedIn });
})

// GET add post
router.get('/dashboard/addPost', withAuth, (req, res) => {
    res.render('add-post', { loggedIn: req.session.loggedIn });
})

// GET login
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login')
});

// GET signup
router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('sign-up')
});

module.exports = router;
