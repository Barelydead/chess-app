var assert = require("assert");

// ioClient
var ioClient = require('socket.io-client');

// Start server
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//io functions
var chat = require("../../src/socket/lobby-socket");



var socketURL = 'http://localhost:1313';
var options = {
    transports: ['websocket'],
    'force new connection': true
};


describe("Test Lobby", function(done) {
    before(function() {
        server.listen(1313);
        chat(io);
    });

    after(function(done) {
        server.close()
        done();
    });

    // it('should broadcast to all', function(done){
    //     var client = ioClient.connect(socketURL, options);
    //     var client2 = ioClient.connect(socketURL, options);
    //
    //
    //     client.on("connect", function() {
    //         client2.on("connect", function() {
    //             client.emit("chat message", {from: "svensson", message: "hej"});
    //             client.disconnect();
    //         });
    //     });
    //
    //     client2.on("chat message", function(data) {
    //         assert.equal(data.from, "svensson");
    //         assert.equal(data.message, "hej");
    //         client2.disconnect();
    //         done();
    //     })
    // });

    it('should add user serverInfo', function(done){
        var client = ioClient.connect(socketURL, options);
        var client2 = ioClient.connect(socketURL, options);


        client.on("connect", function() {
            client2.on("connect", function() {
                    let room = {
                        name: "test room",
                        skill: "low",
                        owner: "andersson",
                        connected: 0,
                        id: 100,
                    };

                client.emit("new room", room);
                client.disconnect();
            });
        });

        client2.on("user list", function(data) {
            assert.equal(data.games[0].name, "test room");
            assert.equal(data.games[0].skill, "low");
            assert.equal(data.games[0].id, 100);
            client2.disconnect();
            done();
        })
    });


    it('should add room to serverIfno', function(done){
        var client = ioClient.connect(socketURL, options);
        var client2 = ioClient.connect(socketURL, options);


        client.on("connect", function() {
            client2.on("connect", function() {
                client.emit("joined room", 100);
                client.disconnect();
            });
        });

        client2.on("user list", function(data) {
            assert.equal(data.games[0].connected, 1);
            client2.disconnect();
            done();
        })
    });


});
