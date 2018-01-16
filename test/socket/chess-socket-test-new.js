var assert   = require("assert");

// ioClient
var ioClient = require('socket.io-client');

// Start server
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//io functions
var chat = require("../../src/socket/chess-socket");



var socketURL = 'http://localhost:3000';
var options = {
    transports: ['websocket'],
    'force new connection': true
};


describe("test chess", function() {
    before(function() {
        server.listen(3000);
        chat(io);
    });

    after(function(done) {
        server.close()
        done();
    });

    it('Should init game with 2 players', function(done) {
        this.timeout(6000);
        let client = ioClient.connect(socketURL, options);
        let client2 = ioClient.connect(socketURL, options);

        client.on("connect", function() {
            client.emit("room id", {roomId: 101, username: "andersson"});
        });

        client2.on("connect", function() {
            client.emit("room id", {roomId: 101, username: "svensson"});
        });

        client.on("color", function(data) {
            assert.equal(data[0], "andersson");
            assert.equal(data[1], "svensson");
        })

        client.on("start game", function(data) {
            assert.equal(data["Player to act"], "white");
            assert.equal(data["Board"].length, 64);
            client.disconnect();
            client2.disconnect();
            done();
        });
    });

    it('Should be able for white to move', function(done) {
        this.timeout(6000);
        let client = ioClient.connect(socketURL, options);
        let client2 = ioClient.connect(socketURL, options);

        client.on("connect", function() {
            client.emit("room id", {roomId: 102, username: "andersson"});
        });

        client2.on("connect", function() {
            client2.emit("room id", {roomId: 102, username: "svensson"});

            let data = {
                x: "B",
                y: 2,
                nx: "C",
                ny: 2,
                color: "white"
            };

            client.emit("move", data)
        });


        client2.on("move", function(data) {
            assert.equal(data["Player to act"], "black");
            assert.equal(data["Board"].length, 64);
            client.disconnect();
            client2.disconnect();
            done();
        })
    });
});
