var assert   = require("assert");

// ioClient
var ioClient = require('socket.io-client');

// Start server
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//io functions
var lobby = require("../../src/socket/lobby-socket");



var socketURL = 'http://localhost:3000';
var options = {
    transports: ['websocket'],
    'force new connection': true
};


describe("test lobby socket", function() {
    before(function() {
        server.listen(3000);
        lobby(io);
    });

    after(function(done) {
        server.close()
        done();
    });

    it('Should add the new room to socketdata and broadcast', function(done) {
        this.timeout(6000);
        let client = ioClient.connect(socketURL, options);

        client.on("connect", function() {
            let room = {
                name: "test name",
                skill: "test skill",
                owner: "test owner",
                connected: 0,
                id: 100
            };

            client.emit("new room", room);
        });

        client.on("user list", function(data) {
            client.disconnect();

            assert.equal(data.games[0].name, "test name");
            assert.equal(data.games[0].skill, "test skill");
            assert.equal(data.games[0].owner, "test owner");
            done();
        });
    });
});
