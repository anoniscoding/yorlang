jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const arrayNl = require("../../../parsers/nodeliterals/arraynl.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("ArrayNodeLiteral test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("It should parse an array literal", () => {
        parser.lexer().inputStream.code = `[1,a,"segun"]`;

        const expectedNode = {
            body: [
                {left: null, operation: null, right: null, value: 1}, 
                {name: "a", operation: constants.GET_JEKI}, 
                {left: null, operation: null, right: null, value: "segun"}
            ], 
            operation: constants.ARRAY
        };

        expect(arrayNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should parse array element", () => {
        parser.lexer().inputStream.code = `a[0]`;
        const arrayNameToken = {value: parser.parseVarname()};

        const expectedNode = {
            indexNodes: [{"left": null, "operation": null, "right": null, "value": 0}], 
            name: "a", 
            operation: constants.ARRAY_ELEM
        };


        expect(arrayNl.getNode.call(parser, arrayNameToken)).toEqual(expectedNode);
    });

    test("It should parse multidimensional array", () => {
        parser.lexer().inputStream.code = `[["corolla", "camry"], ["G-Wagon", "S-class" ], ["Elantra", "sonata"] ]`;

        expect(arrayNl.getNode.call(parser)).toBeTruthy();
    });

    test("It should parse multidimensional array element", () => {
        parser.lexer().inputStream.code = `a[0][1]`;
        const arrayNameToken = {value: parser.parseVarname()};

        expect(arrayNl.getNode.call(parser, arrayNameToken)).toBeTruthy();
    });

    test("It should throw error while parsing invalid array literal", () => {
        parser.lexer().inputStream.code = `[1,2`;

        expect(() => arrayNl.getNode.call(parser)).toThrow();
    });

    test("It should throw error while parsing invalid array element", () => {
        parser.lexer().inputStream.code = `a[1,2]`;
        const arrayNameToken = parser.lexer().next();


        expect(() => arrayNl.getNode.call(parser, arrayNameToken)).toThrow();
    });

});