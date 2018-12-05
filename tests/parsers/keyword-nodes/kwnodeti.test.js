jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const kwNodeTi = require("../../../parsers/keyword-nodes/kwnodejeki.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeTi test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("it should return node with operation assign for a number assignment operation", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 1;`;

        const expectedNode = {
            operation: constants.SYM.ASSIGN,
            left: "a",
            right: {
                value: 1,
                left: null,
                right: null,
                operation: null
            }
        }
        
        expect(kwNodeTi.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation assign for a string assignment operation", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = "blue";`;

        const expectedNode = {
            operation: constants.SYM.ASSIGN,
            left:  "a",
            right: {
                value: "blue",
                left: null,
                right: null,
                operation: null
            }
        }
        
        expect(kwNodeTi.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation assign for a variable assignment operation", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = b;`;

        const expectedNode = {
            operation: constants.SYM.ASSIGN,
            left: "a",
            right: {
                name: "b",
                operation: constants.GET_JEKI
            }
        }
        
        expect(kwNodeTi.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation assign for an array elemnt variable assignment operation", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a[0] = b;`;

        const expectedNode = {
            operation: constants.SYM.ASSIGN,
            left: {
                indexNodes: [{"left": null, "operation": null, "right": null, "value": 0}], 
                name: "a", 
                operation: constants.ARRAY_ELEM
            },
            right: {
                name: "b",
                operation: constants.GET_JEKI
            }
        }
        
        expect(kwNodeTi.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation assign for an array assignment operation", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = [1,"anu",b, c[0], [1,2]];`;

        const expectedNode = {
            operation: constants.SYM.ASSIGN,
            left: "a",
            right: {
                operation: constants.ARRAY,
                body: [
                    {left: null, operation: null, right: null, value: 1}, 
                    {left: null, operation: null, right: null, value: "anu"},
                    {name: "b", operation: constants.GET_JEKI},
                    {indexNodes: [{"left": null, "operation": null, "right": null, "value": 0}], name: "c", operation: constants.ARRAY_ELEM},
                    {body: [{left: null, operation: null, right: null, value: 1}, {left: null, operation: null, right: null, value: 2}], operation: constants.ARRAY}
                ], 
            }
        }
        
        expect(kwNodeTi.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation equals", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 5 ==5 ;`;

        const expectedNode = {
            operation: constants.SYM.ASSIGN,
            left: "a",
            right: {
                operation: constants.SYM.EQ,
                right: {left: null, operation: null, right: null, value: 5},
                left: {left: null, operation: null, right: null, value: 5},
                value: null
            }
        }
        
        expect(kwNodeTi.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation assign for bracket expression", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = (15 /3) + (3 * 2);`;

        const expectedNode = {
            left: "a",  
            operation: constants.SYM.ASSIGN,        
            right: {
                left: {
                    left: {
                        left: null, 
                        operation: null, 
                        right: null, 
                        value: 15
                    }, 
                    operation: "/", 
                    right: {
                        left: null, 
                        operation: null, 
                        right: null, 
                        value: 3
                    }, 
                    value: null
                }, 
                operation: "+", 
                right: {
                    left: {
                        left: null,
                        operation: null, 
                        right: null, 
                        value: 3
                    }, 
                    operation: "*", 
                    right: {
                        left: null, 
                        operation: null, 
                        right: null, 
                        value: 2
                    }, 
                    value: null
                }, 
                value: null
            }
        }
        
        expect(kwNodeTi.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should throw an error when given invalid assignment operation", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = ;`;
        
        expect(() => {
            kwNodeTi.getNode.call(parser)
        }).toThrow();
    });

    test("it should throw an error when variable is not initialized", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a ;`;
        
        expect(() => {
            kwNodeTi.getNode.call(parser)
        }).toThrow();
    });
})