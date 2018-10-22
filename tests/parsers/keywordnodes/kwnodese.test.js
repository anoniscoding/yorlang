const kwNodeSe = require("../../../parsers/keywordnodes/kwnodese.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

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

        expect(kwNodeSe.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return a valid se node when body is empty", () => {
        parser.lexer.inputStream.code = `${constants.KW.SE} (niOruko) {}`;

        const expectedNode = {
            condition: {
                name: "niOruko", 
                operation: constants.GET_TI
            }, 
            operation: constants.KW.SE, 
            then: []
        }

        expect(kwNodeSe.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return a valid se node for nested blocks", () => {
        parser.lexer.inputStream.code = `${constants.KW.SE} (niOruko) {
            ${constants.KW.SE} (niOruko) {}
        }`;

        expect(kwNodeSe.getNode.call(parser)).toBeTruthy();
    });

    test("it should return a valid se and tabi node", () => {
        parser.lexer.inputStream.code = `${constants.KW.SE} (aropo && ${constants.KW.OOTO}) {} tàbí {}`;

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

        expect(kwNodeSe.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should throw an error when given an invalid se and tabi node", () => {
        parser.lexer.inputStream.code = `${constants.KW.SE} aropo && ${constants.KW.OOTO}) {} tàbí {}`;

        expect(() => {
            kwNodeSe.getNode.call(parser);
        }).toThrow();
    });

});