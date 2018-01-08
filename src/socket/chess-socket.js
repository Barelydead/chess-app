const game = require("oop-chess");

let started = false;
let roomId = {};

module.exports = function (io) {
    io.on('connection', function(socket) {
        // Join socket.id to gameroom
        socket.on('room id', function(data) {
            let username = data.username;
            let gameId = data.gameId;

            socket.join(gameId);
            socket.gameRoom = gameId;

            // Join the second player to the gameroom
            if (roomId.hasOwnProperty(gameId)) {
                if (roomId[gameId].length === 1) {
                    roomId[gameId].push({username: username, socketId: socket.id});

                    started = true;
                    game.init(null, roomId[gameId][0].username, roomId[gameId][1].username);

                    io.to(gameId).emit("color",
                        [roomId[gameId][0].username,
                            roomId[gameId][1].username]
                    );
                    io.to(gameId).emit("start game", game.status());
                }
            // Join the first player to the gameroom
            } else {
                roomId[gameId] = [];
                roomId[gameId].push({username: username, socketId: socket.id});
            }
        });

        socket.on("move", function(data) {
            // dont move bevore game starts
            if (started === false) {
                return;
            }

            // Stop wrong player for moving pieces
            if (data.color !== game.turn) {
                return;
            }

            game.movePiece(data.x, data.y, data.nx, data.ny);

            io.to(data.room).emit("move", game.status());
        });

        socket.on('disconnect', function() {
            io.to(socket.gameRoom).emit("player disconnect");

            delete roomId[socket.gameRoom];
        });
    });
};
