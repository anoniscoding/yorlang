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

    //TODO remove isNumStringVariable and use parseNodeliteral so that arrays and array elements can be passed as params

    
    test("it should parse valid callIse syntax with parameters", () => {
        parser.lexer.inputStream.code = `eeyan(1,"anu")`;
        isename = parser.lexer.next();

        const expectedNode = {
            args: [
                {
                    type: constants.NUMBER, 
                    value: 1
                }, 
                {
                    type: constants.STRING, 
                    value: "anu"
                }
            ], 
            name: "eeyan", 
            operation: constants.CALL_ISE
        };

        expect(callIseNl.getNode.call(parser, isename)).toEqual(expectedNode);
    });

    test("it should parse valid callIse syntax without parameters", () => {
        parser.lexer.inputStream.code = `eeyan()`;
        isename = parser.lexer.next();

        const expectedNode = {
            args: [], 
            name: "eeyan", 
            operation: constants.CALL_ISE
        };

        expect(callIseNl.getNode.call(parser, isename)).toEqual(expectedNode);
    });

    test("it should fail to parse invalid callIse syntax", () => {
        parser.lexer.inputStream.code = `eeyan(`;
        isename = parser.lexer.next();
        expect(() => callIseNl.getNode.call(parser, isename)).toThrow();
    })
});