const leafNl = require("../../../parsers/nodeliterals/leafnl.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");

describe("LeafLiteral test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should parse valid leaf - string literal", () => {
        parser.lexer().inputStream.code = `"beautiful";`;

        const expectedNode = {
           left: null,
           operation: null,
           right: null,
           value: "beautiful",
        };

        expect(leafNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should parse valid leaf- number literal", () => {
        parser.lexer().inputStream.code = `7.51;`;

        const expectedNode = {
            left: null,
            operation: null,
            right: null,
            value: 7.51,
        };

        expect(leafNl.getNode.call(parser)).toEqual(expectedNode);
    });

});