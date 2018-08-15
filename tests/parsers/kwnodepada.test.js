const kwNodePada = require("../../parsers/kwnodepada.js")
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("KwNodePada test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return node with body.value of type number", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} 2;`;
        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                value: 2,
                left: null,
                right: null,
                operation: null
            }
        };

        expect(kwNodePada.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("it should return node with body.value of type string", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} "anu";`;
        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                value: "anu",
                left: null,
                right: null,
                operation: null
            }
        };

        expect(kwNodePada.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("It should return node with body.operation of type getTi i.e return a variable", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} sum;`;
        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                name: "sum",
                operation: constants.GET_TI
            }
        };

        expect(kwNodePada.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("It should return node with body.operation of type callIse i.e return the value of a function call", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} sum(1,a);`;
        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                operation: constants.CALL_ISE,
                name: "sum",
                args: [{type: constants.NUMBER, value: 1}, {type: constants.VARIABLE, value: "a"}]
            }
        };

        expect(kwNodePada.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("It should return node with body.operation of type array element i.e return the value of an array element", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} sum[1];`;
        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                operation: constants.ARRAY,
                name: "sum",
                index: 1
            }
        };

        expect(kwNodePada.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("It should return node with body.value of type bool", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} iró;`;
        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                value: "iró",
                left: null,
                right: null,
                operation: null
            }
        };

        expect(kwNodePada.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("It should skip the semicolon after the keyword padà", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} iró;`;
        kwNodePada.setParser(parser).getNode();

        expect(parser.lexer.peek()).toBe(null);
    });
});