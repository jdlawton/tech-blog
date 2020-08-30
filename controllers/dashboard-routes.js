const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

//when the user logs in or clicks on the dashboard link, this routes them to their dashboard
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
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
            const posts = dbPostData.map(post => post.get({plain: true}));
            res.render('dashboard', {posts, loggedIn: true, username: req.session.username});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//when a user clicks on the link to edit one of their posts, this routes them to the appropriate edit page
router.get('/edit/:id', withAuth, (req, res) => {
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
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({message: 'No post found with this id'});
                return;
            }

            const post = dbPostData.get({plain: true});

            res.render('edit-post', {
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