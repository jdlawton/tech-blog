const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
//const withAuth = require('../../utils/auth');

//GET /api/users
router.get('/', (req, res) => {
    //access our User models and run .findAll() method)
    User.findAll({
        attributes: {exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        },
        /*include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            //include the Comment model here:
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]*/
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//POST /api/users (FROM TECH NEWS SITE)
/*
router.post('/', (req, res) => {
    //expects {username: 'Lawton', password: 'password1234'}
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData =>  {
            
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
*/

//POST /api/users
router.post('/', (req, res) => {
    //expect {username: 'Username', password: '12345'}
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

/*
//login route
router.post('/login', (req, res) => {
    //expects {email: 'lawton@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({message: 'No user with that email address!'});
            return;
        }
        //res.json({user: dbUserData});

        //verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({message: 'Incorrect Password!'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({user: dbUserData, message: 'You are now logged in!'});
        });
    });
});
*/

/*
//logout route
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
*/

/*
//PUT /api/users/1 (FROM TECH NEWS SITE)
router.put('/:id', (req, res) => {
    //expects {username: 'Lawton', email: 'lawton@gmail.com', password: 'password1234'}

    //if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
*/

//PUT /api/users/1 (Updates user info)
router.put('/:id', (req,res) => {
    //expects {username: 'Username', password: '12345'}
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

/*
//DELETE /api/users/1 (FROM TECH NEWS SITE)
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
*/

//DELETE /api/users/1 (Not used in the front end)
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;