jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const variableNl = require("../../../parsers/nodeLiterals/variablenl.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("VariableLiteral test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should parse valid variable name", () => {
        parser.lexer().inputStream.code = "name;";

        const expectedNode = {
            name: "name",
            operation: constants.GET_JEKI,
        };

        expect(variableNl.getNode.call(parser)).toEqual(expectedNode);
    });
});
