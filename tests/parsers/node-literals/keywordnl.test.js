const path = require('path');

const keywordNl = require(path.join(rootDir, "parsers/node-literals/keywordnl.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const Lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("KeywordNodeLiteral test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should parse keyword literal", () => {
        parser.lexer().inputStream.code = `${constants.KW.OOTO}`;

        const expectedNode = {
            left: null, 
            operation: null, 
            right: null, 
            value: constants.KW.OOTO
        };

        expect(keywordNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should fail to parse invalid keyword literal", () => {
        parser.lexer().inputStream.code = `${constants.KW.ISE}`;

        expect(() => keywordNl.getNode.call(parser)).toThrow();
    });

});