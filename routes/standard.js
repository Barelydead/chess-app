var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('', {
        title: 'Start',
        path: 'home'
    });
});

/* GET about page. */
router.get('/about', function(req, res) {
    res.render('about', {
        title: 'about',
        path: 'about'
    });
});

/* GET about page. */
router.get('/lobby', function(req, res) {
    if (!req.session.user) {
        let info = encodeURIComponent("Login to use lobby");

        res.redirect("/user/login?info=" + info);
    }

    let username = req.session.user;

    res.render('chess-lobby', {
        title: 'lobby',
        path: 'lobby',
        username: username
    });
});

module.exports = router;
