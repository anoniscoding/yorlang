const kwNodeSope = require("../../../parsers/keywordnodes/kwnodesope.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeSope test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return node with operation sope with body of token number", () => {
        parser.lexer.inputStream.code = `${constants.KW.SOPE} 2;`;
        const expectedNode = {
            operation: constants.KW.SOPE,
            body: {
                value: 2,
                left: null,
                right: null,
                operation: null
            }
        }

        expect(kwNodeSope.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation sope with body of token string", () => {
        parser.lexer.inputStream.code = `${constants.KW.SOPE} "beautiful";`;
        const expectedNode = {
            operation: constants.KW.SOPE,
            body: {
                value: "beautiful",
                left: null,
                right: null,
                operation: null
            }
        }

        expect(kwNodeSope.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation sope with body of token variable", () => {
        parser.lexer.inputStream.code = `${constants.KW.SOPE} name;`;
        const expectedNode = {
            operation: constants.KW.SOPE,
            body: {
                name: "name",
                operation: constants.GET_TI
            }
        }

        expect(kwNodeSope.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation sope with body of node callIse", () => {
        parser.lexer.inputStream.code = `${constants.KW.SOPE} sum(1,2);`;
        const expectedNode = {
            operation: constants.KW.SOPE,
            body: {
                operation: constants.CALL_ISE,
                name: "sum",
                paramValues: [{left: null, operation: null, right: null, value: 1}, {left: null, operation: null, right: null, value: 2}]
            }
        }

        expect(kwNodeSope.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation sope with body of node array element", () => {
        parser.lexer.inputStream.code = `${constants.KW.SOPE} a[1];`;
        const expectedNode = {
            operation: constants.KW.SOPE,
            body: {
                operation: constants.ARRAY_ELEM,
                name: "a",
                index: {"left": null, "operation": null, "right": null, "value": 1}
            }
        }

        expect(kwNodeSope.getNode.call(parser)).toEqual(expectedNode);
    });

    test(`It should skip the semicolon after the keyword ${constants.KW.SOPE}`, () => {
        parser.lexer.inputStream.code = `${constants.KW.SOPE} a;`;
        kwNodeSope.getNode.call(parser);

        expect(parser.lexer.peek()).toBe(null);
    });

    test("it should return node with operation sope with body of node array literal", () => {
        parser.lexer.inputStream.code = `${constants.KW.SOPE} [2,3];`;

        expect(kwNodeSope.getNode.call(parser)).toBeTruthy();
    });

    test("it should return node with operation sope with body of an expression", () => {
        parser.lexer.inputStream.code = `${constants.KW.SOPE} 2 + 2;`;

        expect(kwNodeSope.getNode.call(parser)).toBeTruthy();
    });

    test("It should throw an error when given invalid input", () => {
        parser.lexer.inputStream.code = `${constants.KW.SOPE} (2,3);`;

        expect(() => {
            kwNodeSope.getNode.call(parser)        
        }).toThrow();
    });
});