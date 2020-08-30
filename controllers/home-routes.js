const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');

//route to render the homepage
router.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.session.username);
    Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({plain: true}));
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn,
                username: req.session.username
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//route to render the login page
router.get('/login', (req, res) => {
    //if user is already logged in, redirect to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//route to render the signup page
router.get('/signup', (req, res) => {
    //if user is already logged in, redirect to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

//route to display an individual post
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({message: 'No post found with this id'});
                return;
            }

            const post = dbPostData.get({plain: true});

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn,
                username: req.session.username
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;