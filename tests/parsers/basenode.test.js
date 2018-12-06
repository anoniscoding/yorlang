const path = require('path');

const BaseNode = require(path.join(rootDir, "parsers/baseNode.js"));
const kwNodeMock = require(path.join(rootDir, "tests/mocks/kwNode.mock.js"));
const Parser = require(path.join(rootDir,"parsers/parser.js"));
const Lexer = require(path.join(rootDir,"lexer.js"));
const InputStream = require(path.join(rootDir,"inputStream.js"));

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
});