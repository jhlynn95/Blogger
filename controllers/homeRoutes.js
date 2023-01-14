const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

const withAuth = require('../utils/auth');

// GET homepage
router.get('/', async (req, res) => {
    try {
        const dbBlogData = await Blog.findAll({
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

        const blogs = dbBlogData.map((blog) =>
            blog.get({ plain: true })
        );

        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET homepage click blog
router.get('/homepage/blog/:id', withAuth, async (req, res) => {
    const dbBlogData = await Blog.findByPk(req.params.id, {
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'createdAt', 'user_id', 'blog_id', 'id'],
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
    const blog = dbBlogData.get({ plain: true });

    res.render('single-post-home', {
        blog,
        loggedIn: req.session.loggedIn,
    })
});

// GET user comment
router.get('/hompage/blog/comment/:id', withAuth, async (req, res) => {
    const dbCommentData = await Comment.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    });
    const comment = dbCommentData.get({ plain: true });
    let blogId = comment.blog_id;
    if(comment.user_id !== req.session.userId) {
        res.redirect(`/homepage/blog/${blogId}`);
        console.log('Only the user who created the comment can edit this comment.')
        return;
    }
    res.render('comment-edit', { comment, loggedIn: req.session.loggedIn })
})

// GET user blogs dashboard
router.get('/dashboard', async (req, res) => {
    try {
        if(!req.session.loggedIn) {
            console.log('Please log in or sign up to view dashboard.')
            res.redirect('/login')
            return;
        }

        const dbBlogData = await Blog.findAll({
            where: {
                user_id: req.session.userId,
            }
        });

        const blogs = dbBlogData.map((blog) => 
            blog.get({ plain: true })
        );

        res.render('dashboard', { blogs, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET single post from dashboard
router.get('/dashboard/blog/:id', withAuth, async (req, res) => {

    const dbBlogData = await Blog.findByPk(req.params.id);

    const blogs = dbBlogData.get({ plain: true })
    
    res.render('single-post-dashboard', { blogs, loggedIn: req.session.loggedIn });
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
