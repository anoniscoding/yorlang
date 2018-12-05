jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const bracketExpNl = require("../../../parsers/nodeliterals/bracketexpressionnl.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("BracketExpressionLiteral test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should parse arithmetic bracket expression", () => {
        parser.lexer().inputStream.code = `((15 /3) + (3 * 2))`;

        const expectedNode = {
            left: {
                left: {
                    left: null, 
                    operation: null, 
                    right: null, 
                    value: 15
                }, 
                operation: constants.SYM.DIVIDE, 
                right: {
                    left: null, 
                    operation: null, 
                    right: null, 
                    value: 3
                }, 
                value: null
            }, 
            operation: constants.SYM.PLUS, 
            right: {
                left: {
                    left: null, 
                    operation: null, 
                    right: null, 
                    value: 3
                }, 
                operation: constants.SYM.MULTIPLY, 
                right: {
                    left: null, 
                    operation: null, 
                    right: null, 
                    value: 2
                }, 
                value: null
            }, 
            value: null
        };

        expect(bracketExpNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should parse boolean bracket expression", () => {
        parser.lexer().inputStream.code = `((ikeji < aropo) && (ikeji > 0))`;

        const expectedNode = {
            left: {
                left: {
                    name: "ikeji", 
                    operation: constants.GET_JEKI
                }, 
                operation: constants.SYM.L_THAN, 
                right: {
                    name: "aropo", 
                    operation: constants.GET_JEKI
                }, 
                value: null
            }, 
            operation: constants.SYM.AND, 
            right: {
                left: {
                    name: "ikeji", 
                    operation: constants.GET_JEKI
                }, 
                operation: constants.SYM.G_THAN, 
                right: {
                    left: null, 
                    operation: null, right: null, 
                    value: 0
                }, 
                value: null
            }, 
            value: null
        };
        expect(bracketExpNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should fail to parse invalid bracket expression", () => {
        parser.lexer().inputStream.code = `ikeji < aropo) && (ikeji > 0)`;
        expect(() => bracketExpNl.getNode.call(parser)).toThrow();
    });

});