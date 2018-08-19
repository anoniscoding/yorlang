const arrayNl = require("../../../parsers/nodeliterals/arraynl.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("ArrayNodeLiteral test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("It should parse an array literal", () => {
        parser.lexer.inputStream.code = `[1,a,"segun"]`;

        const expectedNode = {
            body: [
                {
                    type: constants.NUMBER, 
                    value: 1
                }, 
                {
                    type: constants.VARIABLE, 
                    value: "a"
                }, 
                {
                    type: constants.STRING, 
                    value: "segun"
                }
            ], 
            operation: constants.ARRAY
        };

        expect(arrayNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should parse array element", () => {
        parser.lexer.inputStream.code = `a[0]`;
        const arrayNameToken = {value: parser.parseVarname()};

        const expectedNode = {
            index: 0, 
            name: "a", 
            operation: constants.ARRAY
        };


        expect(arrayNl.getNode.call(parser, arrayNameToken)).toEqual(expectedNode);
    });

    test("It should throw error while parsing invalid array literal", () => {
        parser.lexer.inputStream.code = `[1,2`;

        expect(() => arrayNl.getNode.call(parser)).toThrow();
    });

    test("It should throw error while parsing invalid array element", () => {
        parser.lexer.inputStream.code = `a[1,2]`;
        const arrayNameToken = parser.lexer.next();


        expect(() => arrayNl.getNode.call(parser, arrayNameToken)).toThrow();
    });

});