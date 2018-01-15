var assert = require("assert");
var db = require("../../src/db/db-functions");
var chai = require("chai");

var expect = chai.expect;

db.dsn = "mongodb://localhost:27017/test";


describe("Testing database functionallity", function() {
    before("init db with testUser", async function() {
        let user1 = {
            "username": "user1",
            "password": "password"
        };

        let user2 = {
            "username": "user2",
            "password": "password2"
        };

        let chatMessage = {
            from: "andersson",
            message: "test message",
            time: new Date()
        }


        db.insertItem("chat", chatMessage);
        db.insertItem("testUser", user1);
        db.insertItem("testUser", user2);
    });

    after("Remove all test data", async function() {
        let userCol = await db.getCollection("testUser");
        let chatCol = await db.getCollection("chat");

        for (let i = 0; i < userCol.length; i++) {
            db.deleteItem("testUser", userCol[i]._id);
        }

        for (let i = 0; i < chatCol.length; i++) {
            db.deleteItem("chat", chatCol[i]._id);
        }
    });

    describe("Get the db object and assert", function() {
        it('Should return database object', async function() {

        var connection = await db.connect();

        expect(typeof(connection)).to.equal("object");
        });
    });

    describe("Get collection", function() {
        it('should be length 2', async function() {

        var users = await db.getCollection("testUser");

        expect(users.length).to.equal(2);
        expect(users[0].username).to.equal("user1");
        });
    });

    describe("Get user based on name", function() {
        it('Should return user. Assert password', async function() {

        var user = await db.getUser("testUser", "user1");

        expect(user[0].password).to.equal("password");
        });
    });


    describe("Get chat", function() {
        it('Should get latest chat messages', async function() {

        var chat = await db.getChat();

        expect(chat[0].from).to.equal("andersson");
        expect(chat.length).to.equal(1);
        });
    });


    describe("Get item", function() {
        it('Should get one item from database', async function() {
        var col = await db.getCollection("testUser");
        var user = await db.getItem("testUser", col[0]._id);

        expect(user[0].username).to.equal("user1");
        });
    });

});
