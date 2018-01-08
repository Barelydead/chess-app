var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/:gameId', function(req, res) {
    if (!req.session.user) {
        res.redirect("/user/login")
    }

    const game = require("oop-chess");
    game.init();

    gameId = req.params.gameId;
    res.render('chess-index', {
        title: 'game',
        path: 'chess',
        gameId: gameId,
        username: req.session.user,
        board: game.board.getBoardArray()
    });
});





module.exports = router;
