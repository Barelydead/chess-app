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
        })

        client2.on("connect", function() {
            client.emit("room id", {roomId: 101, username: "svensson"});
        })

        client.on("start game", function(data) {
            client.disconnect();
            client2.disconnect();
            done();
        })
    });
});
