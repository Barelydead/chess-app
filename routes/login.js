var express = require('express');
var router = express.Router();
let helper = require("../src/utils/helper");
let db = require("../src/db/db-functions");

/* GET about page. */
router.get('/create', function(req, res) {
    var info = req.query.info ? req.query.info : "";

    res.render('create-account', {
        title: 'create account',
        path: 'user',
        info: info
    });
});


/* GET about page. */
router.post('/create', async function(req, res) {
    let params = req.body;

    try {
        let user = await db.getUser("users", params.username);

        if (user[0]) {
            res.redirect("/user/create?info=" + encodeURIComponent("Username already taken"));
        }
    } catch (e) {
        console.log(e);
    }

    let hash = helper.getHash(req.body);

    params.password = hash;

    delete params.rePassword;
    params.username = params.username.toLowerCase();

    db.insertItem("users", params);
    res.redirect("/user/login?info=" + encodeURIComponent("New user was created"));
});


/* GET about page. */
router.get('/login', function(req, res) {
    var info = req.query.info ? req.query.info : "";

    res.render('login-account', {
        title: 'Login',
        path: 'user',
        info: info
    });
});

/* GET about page. */
router.get('/logout', function(req, res) {
    req.session.reset();

    res.redirect("/user/login?info=" + encodeURIComponent("You have been logged out"));
});


/* GET about page. */
router.post('/login', async function(req, res) {
    let params = req.body;

    try {
        let user = await db.getUser("users", params.username);

        if (!helper.verifyPassword(params.password, user[0].password)) {
            res.redirect("/user/login?info=" + encodeURIComponent("Login failed, try again"));
        } else {
            req.session.user = params.username;
            res.redirect("/user/login?info=" + encodeURIComponent("Login success"));
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
