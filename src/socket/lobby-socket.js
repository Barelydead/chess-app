const db = require("../db/db-functions");

var serverInfo = {
    connected: 0,
    users: {},
    games: []
};

module.exports = function (io) {
    io.on('connection', function(socket) {
        console.log("connected to lobby");

        socket.on("username", async function(username) {
            try {
                let chat = await db.getChat();
                console.log(chat);
                io.sockets.emit("prefill chat", chat);
            } catch (e) {
                console.log("DB ERROR: ", e);
            }



            socket.username = username;
            if (!serverInfo.users[username]) {
                serverInfo.users[username] = socket.id;
            }

            io.sockets.emit("user list", serverInfo);
        })

        socket.on('disconnect', function() {
            console.log("disconnected");
            delete serverInfo.users[socket.username];
            io.sockets.emit("user list", serverInfo);
        });

        socket.on('chat message', function(data) {
            data.time = new Date();

            db.insertItem("chat", data)

            io.sockets.emit('chat message', data);
        });

        socket.on("private message", function(data) {
            data.class = "private";

            if (typeof users[data.to] !== "undefined") {
                socket.to(users[data.to].id).emit("recieve private", data);
            }
        });

        socket.on("new room", function(room) {
            serverInfo.games.push(room);

            io.sockets.emit("user list", serverInfo);
        })


        socket.on("joined room", function(id) {
            for (let i = 0; i < serverInfo.games.length; i++) {
                if (serverInfo.games[i].id == id) {
                    serverInfo.games[i].connected += 1;
                    let index = i;

                    if (serverInfo.games[index].connected == 2) {
                        serverInfo.games.splice(index, 1);
                    }
                }
            }

            io.sockets.emit("user list", serverInfo);
        })
    });
};
