jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const netgateExpressionNl = require("../../../parsers/nodeLiterals/negateexpressionnl.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("NegateExpressionNl test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("It should parse negative number literal", () => {
        parser.lexer().inputStream.code = `${constants.SYM.MINUS}2`;

        const expectedNode = {
            operation: constants.NEGATE_EXPRESSION,
            body: {
                left: null,
                operation: null,
                right: null,
                value: 2,
            },
        };

        expect(netgateExpressionNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should parse negative expression", () => {
        parser.lexer().inputStream.code = `${constants.SYM.MINUS} apere();`;

        const expectedNode = {
            operation: constants.NEGATE_EXPRESSION,
            body: {
                operation: constants.CALL_ISE,
                name: "apere",
                paramValues: [],
            },
        };

        expect(netgateExpressionNl.getNode.call(parser)).toEqual(expectedNode);
    });
});
