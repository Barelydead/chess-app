// var assert = require("assert");
//
// // ioClient
// var ioClient = require('socket.io-client');
//
// // Start server
// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
//
// //io functions
// var chat = require("../../src/socket/chess-socket");
//
//
//
// var socketURL = 'http://localhost:3000';
// var options = {
//     transports: ['websocket'],
//     'force new connection': true
// };
//
//
// describe("test chess", function(done) {
//     before(function() {
//         server.listen(3000);
//         chat(io);
//     });
//
//     after(function(done) {
//         server.close()
//         done();
//     });
//
//     it('', function(done){
//         var client = ioClient.connect(socketURL, options);
//         var client2 = ioClient.connect(socketURL, options);
//         let gameId = 100;
//         let username = "Andersson";
//
//
//         client.on("connect", function() {
//             done();
//             client.disconnect();
//         });
//
//
//     });
//
//
// });
