//The withAuth middleware is designed to authguard any routes in the site that shouldn't be able to be accessed by
//users who are not logged in. When one of these routes is called, it first checks to see if the user is logged in
//and if they are NOT, it will route them back to the login page.
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;