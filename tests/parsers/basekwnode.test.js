const BaseKwNode = require("../../parsers/basekwnode.js");
const kwNodeMock = require("../mocks/kwnode.mock.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");

describe("BasekwNode ", () => {

    test("Constructor - it should throw error while attempting to instantiate constructor", () => {
        expect(() => {
            new BaseKwNode()
        }).toThrow("Cannot instantiate abstract class BaseKwNode");
    });

    test("GetNode - it should throw error while attempting to call getNode on subClass that has not overridden getNode", () => {
        parser = new Parser(new Lexer(new InputStream("code")));


        expect(() => {
            kwNodeMock.setParser(parser).getNode();
        }).toThrow("KwNodeMock must override getNode");
    });
})