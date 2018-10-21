const callIseNl = require("../../../parsers/nodeliterals/callisenl.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("CallIseLiteral test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });
    
    test("it should parse valid callIse syntax with parameters", () => {
        parser.lexer.inputStream.code = `eeyan(1,"anu");`;

        const expectedNode = {
            paramValues: [
                {left: null, operation: null, right: null, value: 1}, 
                {left: null, operation: null, right: null, value: "anu"}
            ], 
            name: "eeyan", 
            operation: constants.CALL_ISE
        };

        expect(callIseNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should parse valid callIse syntax without parameters", () => {
        parser.lexer.inputStream.code = `eeyan();`;

        const expectedNode = {
            paramValues: [], 
            name: "eeyan", 
            operation: constants.CALL_ISE
        };

        expect(callIseNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should fail to parse invalid callIse syntax", () => {
        parser.lexer.inputStream.code = `eeyan(`;
        expect(() => callIseNl.getNode.call(parser)).toThrow();
    })
});