

let app = require("../../app.js");
let request = require("supertest");


describe('Get index and check header', function() {
    it('should return 200', function(done) {
        request(app).get("/")
            .expect(200, done);
    });
});

describe('Get invalid route and check header', function() {
    it('should be 404', function(done) {
        request(app).get("/faulty/route")
            .expect(404, done);
    });
});
