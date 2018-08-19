const BaseNode = require("../../parsers/basenode.js");
const kwNodeMock = require("../mocks/kwnode.mock.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");

describe("BaseNode test suite ", () => {

    test("Constructor - it should throw error while attempting to instantiate constructor", () => {
        expect(() => {
            new BaseNode()
        }).toThrow("Cannot instantiate abstract class BaseNode");
    });

    test("GetNode - it should throw error while attempting to call getNode on a class that has not overridden getNode", () => {
        parser = new Parser(new Lexer(new InputStream("code")));

        expect(() => {
            kwNodeMock.getNode.call(this);
        }).toThrow("Class of type BaseNode must implement getNode()");
    });
})