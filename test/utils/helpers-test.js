var assert = require("assert");
var utils = require("../../src/utils/helper");


describe("test Utility functions", function() {
    it('output hash if pass match', function() {
        //return false if
        assert.equal(utils.getHash({password: "hej", rePassword: "tja"}), false);

        let hash = utils.getHash({password: "hej", rePassword: "hej"});
        assert.ok(hash.length > 20)
    });

    it('true if match', function() {
        let hash = utils.getHash({password: "hej", rePassword: "hej"});

        assert.ok(utils.verifyPassword("hej", hash));
    });
});
