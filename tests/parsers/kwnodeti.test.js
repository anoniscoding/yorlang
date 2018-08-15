const kwNodeTi = require("../../parsers/kwnodeti.js")
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("KwNodeTi test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return node with operation assign for a number assignment operation", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = 1;`;

        const expectedNode = {
            operation: constants.SYM.ASSIGN,
            left: { name: "a" },
            right: {
                value: 1,
                left: null,
                right: null,
                operation: null
            }
        }
        
        expect(kwNodeTi.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("it should return node with operation assign for a string assignment operation", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = "blue";`;

        const expectedNode = {
            operation: constants.SYM.ASSIGN,
            left: { name: "a" },
            right: {
                value: "blue",
                left: null,
                right: null,
                operation: null
            }
        }
        
        expect(kwNodeTi.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("it should return node with operation assign for a variable assignment operation", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = b;`;

        const expectedNode = {
            operation: constants.SYM.ASSIGN,
            left: { name: "a" },
            right: {
                name: "b",
                operation: constants.GET_TI
            }
        }
        
        expect(kwNodeTi.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("it should return node with operation assign for a array assignment operation", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = [1,2];`;

        const expectedNode = {
            operation: constants.SYM.ASSIGN,
            left: { name: "a" },
            right: {
                operation: constants.ARRAY,
                body: [{type: constants.NUMBER, value: 1}, {type: constants.NUMBER, value: 2}], 
            }
        }
        
        expect(kwNodeTi.setParser(parser).getNode()).toEqual(expectedNode);
    });
})