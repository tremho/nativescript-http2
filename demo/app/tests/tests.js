var Http2 = require("nativescript-http2").Http2;
var http2 = new Http2();

describe("greet function", function() {
    it("exists", function() {
        expect(http2.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(http2.greet()).toEqual("Hello, NS");
    });
});