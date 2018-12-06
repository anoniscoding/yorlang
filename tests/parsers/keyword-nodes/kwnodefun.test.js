const path = require('path');

const kwNodeFun = require(path.join(rootDir, "parsers/keyword-nodes/kwnodefun.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("KwNodeFun test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("it should return a valid fun node", () => {
        parser.lexer().inputStream.code = `${constants.KW.FUN} (${constants.KW.JEKI} i =0; i < 10; ${constants.KW.JEKI} i = i + 1;) {}`;

        const expectedNode = {
            body: [], 
            condition: {
                left: {
                    name: "i", 
                    operation: constants.GET_JEKI
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
                left: "i", 
                operation: constants.SYM.ASSIGN, 
                right: {
                    left: {
                        name: "i", 
                        operation: constants.GET_JEKI
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
                left: "i", 
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

        expect(kwNodeFun.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return a valid fun node for nested blocks", () => {
        parser.lexer().inputStream.code = `${constants.KW.FUN} (${constants.KW.JEKI} i =0; i < 10; ${constants.KW.JEKI} i = i + 1;) {
            ${constants.KW.FUN} (${constants.KW.JEKI} i =0; i < 10; ${constants.KW.JEKI} i = i + 1;) {}
        }`;

        expect(kwNodeFun.getNode.call(parser)).toBeTruthy();
    });

    test("it should throw an error when given invalid fun node", () => {
        parser.lexer().inputStream.code = `${constants.KW.FUN} ${constants.KW.JEKI} i =0; i < 10; ${constants.KW.JEKI} i = i + 1;) {
            ${constants.KW.SOPE} i;
        }`;

        expect(() => {
            kwNodeFun.getNode.call(parser);
        }).toThrow();
    });

    test("it should throw an error when given invalid fun increment node", () => {
        parser.lexer().inputStream.code = `${constants.KW.FUN} (${constants.KW.JEKI} i =0; i < 10; ${constants.KW.JEKI} i = j + 1;) {
            ${constants.KW.SOPE} i;
        }`;

        expect(() => {
            kwNodeFun.getNode.call(parser);
        }).toThrow();
    });

});