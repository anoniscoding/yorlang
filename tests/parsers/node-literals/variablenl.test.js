const path = require('path');

const variableNl = require(path.join(rootDir, "parsers/node-literals/variablenl.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const Lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("VariableLiteral test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should parse valid variable name", () => {
        parser.lexer().inputStream.code = `name;`;

        const expectedNode = {
            name: "name",
            operation: constants.GET_JEKI
        };

        expect(variableNl.getNode.call(parser)).toEqual(expectedNode);
    });
});