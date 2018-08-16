const kwNodeSe = require("../../parsers/kwnodese.js")
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("KwNodeSe test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return a valid se node", () => {
        parser.lexer.inputStream.code = `${constants.KW.SE} (niOruko) {
            ${constants.KW.SOPE} "o ni oruko";
        }`;

        const expectedNode = {
            condition: {
                name: "niOruko", 
                operation: constants.GET_TI
            }, 
            operation: constants.KW.SE, 
            then: [
                {
                    body: {
                        left: null, 
                        operation: null, 
                        right: null, 
                        value: "o ni oruko"
                    }, 
                    operation: constants.KW.SOPE
                }
            ]
        }

        expect(kwNodeSe.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("it should return a valid se node when body then is empty", () => {
        parser.lexer.inputStream.code = `${constants.KW.SE} (niOruko) {}`;

        const expectedNode = {
            condition: {
                name: "niOruko", 
                operation: constants.GET_TI
            }, 
            "operation": constants.KW.SE, 
            then: []
        }

        expect(kwNodeSe.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("it should return a valid se and tabi node", () => {
        parser.lexer.inputStream.code = `${constants.KW.SE} (aropo && òótó) {} tàbí {}`;

        const expectedNode = {
            condition: {
                left: {
                    name: "aropo", 
                    operation: constants.GET_TI
                }, 
                operation: constants.SYM.AND, 
                right: {
                    left: null, 
                    operation: null, 
                    right: null,
                    value: constants.KW.OOTO
                }, 
                value: null
            }, 
            else: [], 
            operation: constants.KW.SE, 
            then: []
        };

        expect(kwNodeSe.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("it should return a valid se and tabi node", () => {
        parser.lexer.inputStream.code = `${constants.KW.SE} aropo && òótó) {} tàbí {}`;

        expect(() => {
            kwNodeSe.setParser(parser).getNode();
        }).toThrow();
    });

});