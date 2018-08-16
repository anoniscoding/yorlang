const kwNodeFun = require("../../parsers/kwnodefun.js")
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("KwNodeSe test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return a valid fun node", () => {
        parser.lexer.inputStream.code = `${constants.KW.FUN} (tí i =0; i < 10; tí i = i + 1;) {}`;

        const expectedNode = {
            body: [], 
            condition: {
                left: {
                    name: "i", 
                    operation: constants.GET_TI
                }, 
                operation: constants.SYM.L_THAN, 
                right: {
                    left: null, 
                    operation: null, 
                    right: null, 
                    value: 10
                }, 
                value: null
            }, 
            increment: {
                left: {
                    name: "i"
                }, 
                operation: constants.SYM.ASSIGN, 
                right: {
                    left: {
                        name: "i", 
                        operation: constants.GET_TI
                    },
                    operation: constants.SYM.PLUS, 
                    right: {
                        left: null, 
                        operation: null, 
                        right: null, 
                        value: 1
                    }, 
                    value: null
                }
            }, 
            init: {
                left: {
                    name: "i"
                }, 
                operation: constants.SYM.ASSIGN, 
                right: {
                    left: null, 
                    operation: null, 
                    right: null, 
                    value: 0
                }
            }, 
            operation: constants.KW.FUN
        };

        expect(kwNodeFun.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("it should return a valid fun node for nested blocks", () => {
        parser.lexer.inputStream.code = `${constants.KW.FUN} (tí i =0; i < 10; tí i = i + 1;) {
            ${constants.KW.FUN} (tí i =0; i < 10; tí i = i + 1;) {}
        }`;

        expect(kwNodeFun.setParser(parser).getNode()).toBeTruthy();
    });

    test("it should throw an error when given invalid fun node", () => {
        parser.lexer.inputStream.code = `${constants.KW.FUN} tí i =0; i < 10; tí i = i + 1;) {
            sopé i;
        }`;

        expect(() => {
            kwNodeFun.setParser(parser).getNode();
        }).toThrow();
    });

});