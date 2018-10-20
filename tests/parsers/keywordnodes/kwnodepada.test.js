const kwNodePada = require("../../../parsers/keywordnodes/kwnodepada.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodePada test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return node with body.value of type number", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} 2;`;
        parser.pushToBlockTypeStack(constants.KW.ISE);

        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                value: 2,
                left: null,
                right: null,
                operation: null
            }
        };

        expect(kwNodePada.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with body.value of type string", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} "anu";`;
        parser.pushToBlockTypeStack(constants.KW.ISE);

        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                value: "anu",
                left: null,
                right: null,
                operation: null
            }
        };

        expect(kwNodePada.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should return node with body.operation of type getTi i.e return a variable", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} sum;`;
        parser.pushToBlockTypeStack(constants.KW.ISE);

        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                name: "sum",
                operation: constants.GET_TI
            }
        };

        expect(kwNodePada.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should return node with body.operation of type callIse i.e return the value of a function call", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} sum(1,a);`;
        parser.pushToBlockTypeStack(constants.KW.ISE);

        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                operation: constants.CALL_ISE,
                name: "sum",
                paramValues: [
                    {left: null, operation: null, right: null, value: 1}, 
                    {name: "a", operation: constants.GET_TI}
                ]
            }
        };

        expect(kwNodePada.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should return node with body.operation of type array element i.e return the value of an array element", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} sum[1];`;
        parser.pushToBlockTypeStack(constants.KW.ISE);

        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                operation: constants.ARRAY_ELEM,
                name: "sum",
                index: 1
            }
        };

        expect(kwNodePada.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should return node with body.value of type bool", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} ${constants.KW.IRO};`;
        parser.pushToBlockTypeStack(constants.KW.ISE);

        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                value: `${constants.KW.IRO}`,
                left: null,
                right: null,
                operation: null
            }
        };

        expect(kwNodePada.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should return node with body.operation 'array' ", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} [1,2];`;
        parser.pushToBlockTypeStack(constants.KW.ISE);

        const expectedNode = {
                operation: constants.KW.PADA,
                body: {
                    operation: constants.ARRAY,
                    body: [
                        {left: null, operation: null, right: null, value: 1}, 
                        {left: null, operation: null, right: null, value: 2}]
                }
            };
    
                expect(kwNodePada.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should return node with body.operation 'array' when array is empty", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} [];`;
        parser.pushToBlockTypeStack(constants.KW.ISE);

        const expectedNode = {
            operation: constants.KW.PADA,
            body: {
                operation: constants.ARRAY,
                body: []
            }
        };
    
        expect(kwNodePada.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should skip the semicolon after the keyword padà", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} iró;`;
        parser.pushToBlockTypeStack(constants.KW.ISE);
        kwNodePada.getNode.call(parser);

        expect(parser.lexer.peek()).toBe(null);
    });

    test("It should throw an error when given invalid pada node", () => {
        parser.lexer.inputStream.code = `${constants.KW.PADA} );`;
        parser.pushToBlockTypeStack(constants.KW.ISE);

        expect(() => {
            kwNodePada.getNode.call(parser);
        }).toThrow();
    });
});