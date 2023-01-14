const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// each route has /api/users

// POST create new user
router.post('/signup', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = dbUserData.id;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST Login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = dbUserData.id;

            res.status(200).json({ username: dbUserData, message: 'You are now logged in!' });
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST logout
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// POST add post
router.post('/addPost', async (req, res) => {
    try {
        console.log(req.session.userId);
        const dbPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId,
        });
        res.status(200).json(dbPostData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST add comment
router.post('/addComment', async (req, res) => {
    try {
        const dbCommentData = await Comment.create({
            comment_text: req.body.comment_text,
            Post_id: req.body.Post_id,
            user_id: req.session.userId,
        })
        res.status(200).json(dbCommentData);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

// PUT update post
router.put('/updatePost/:id', async (req, res) => {
    try {
        const dbPostData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                }
            }
        );
        res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// DELETE post
router.delete('/deletePost/:id', async (req, res) => {
    try {
        const comments = await Comment.destroy({
            where: {
                Post_id: req.params.id,
            }
        });
        const Post = await Post.destroy({
            where: {
                id: req.params.id,
            }
        });

        if(!Post) {
            res.status(404).json({ message: "No Post found with that id!" });
            return;
        }
        console.log(comments)
        res.status(200).json(Post)
        
    } catch (err) {
        res.status(500).json(err);
    }
})

// PUT update comment
router.put('/updateComment/:id', async (req, res) => {
    try {
        const dbCommentData = await Comment.update(
            {
                comment_text: req.body.comment_text,
            },
            {
                where: {
                    id: req.params.id,
                }
            }
        );
        res.status(200).json(dbCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// DELETE comment
router.delete('/deleteComment/:id', async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                id: req.params.id,
            }
        });

        if(!comment) {
            res.status(404).json({ message: "No comment found with that id!"});
            return;
        }

        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;