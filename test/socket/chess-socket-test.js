var assert   = require("assert");

// ioClient
var ioClient = require('socket.io-client');

// Start server
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//io functions
var chat = require("../../src/socket/chess-socket");



var socketURL = 'http://localhost:1212';
var options = {
    transports: ['websocket'],
    'force new connection': true
};


describe("test chess", function(done) {
    before(function() {
        server.listen(1212);
        chat(io);
    });

    after(function(done) {
        server.close()
        done();
    });

    it('Should init game with 2 players', function(done){
        let client = ioClient.connect(socketURL, options);
        let client2 = ioClient.connect(socketURL, options);


        client.on("connect", function() {
            client2.on("connect", function() {
                client.emit("room id", {roomId: 101, username: "andersson"});
                client.emit("room id", {roomId: 101, username: "svensson"});
            });
        });

        client.on("color", function(data) {
            assert.equal(data[0], "andersson");
            assert.equal(data[1], "svensson");
        })

        client.on("start game", function(data) {
            assert.ok(data.Board.length === 64);
            assert.ok(data["Player to act"] === "white");
            assert.ok(data["White name"] === "andersson");
            client.disconnect();
            client2.disconnect();
            done();
        })

        // client.emit("move", {x:"B", y:2, nx:"C", ny:2})
        //
        // client.on("move", function(data) {
        //     console.log("move")
        //     client.disconnect();
        //     client2.disconnect();
        //     done();
        // });


    });


});
