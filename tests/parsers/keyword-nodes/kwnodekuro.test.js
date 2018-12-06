const path = require('path');

const kwNodeKuro = require(path.join(rootDir, "parsers/keyword-nodes/kwnodekuro.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const Lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));
const fs = require("fs");

describe("KwNodeKuro test suite", () => {
    let parser;

    beforeEach(() => {
        fs.readFileSync.mockReturnValue(`${constants.KW.KURO};`);
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("It should return a kúrò node ast when kuro node is expected because it is within a loop", () => {
        const expectedNode = {operation: constants.KW.KURO};
        parser.pushToBlockTypeStack(constants.KW.NIGBATI);

        expect(kwNodeKuro.getNode.call(parser))
            .toEqual(expectedNode);
    });

    test("It should skip the semicolon after an expected keyword kúrò", () => {
        parser.pushToBlockTypeStack(constants.KW.NIGBATI);
        kwNodeKuro.getNode.call(parser);
        
        expect(parser.lexer().peek()).toBe(null);
    });

    test("It should fail to return a kuro node because the kuro keyword is not within a loop", () => {
        expect(() => kwNodeKuro.getNode.call(parser)).toThrow();
    });
});