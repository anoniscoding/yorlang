jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const kwNodeNigbati = require("../../../parsers/keywordnodes/kwnodenigbati.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeNigbati test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return a nigbati node", () => {
        parser.lexer().inputStream.code = `${constants.KW.NIGBATI} ((ikeji < aropo) && (ikeji > 0)) {
            ${constants.KW.SOPE} "a jura wa lo tijakadi ko";
            ${constants.KW.TI} ikeji = ikeji + 1;
        }`;

        const expectedNode = {
            body: [
                {
                    body: {
                        left: null, 
                        operation: null, 
                        right: null, 
                        value: "a jura wa lo tijakadi ko"
                    }, 
                    operation: constants.KW.SOPE
                }, 
                {
                    left: "ikeji", 
                    operation: constants.SYM.ASSIGN, 
                    right: {
                        left: {
                            name: "ikeji", 
                            operation: constants.GET_TI
                        }, 
                        operation: "+", 
                        right: {
                            left: null, 
                            operation:null, 
                            right: null, 
                            value: 1
                        }, 
                        value: null
                    }
                }
            ], 
            condition: {
                left: {
                    left: {
                        name: "ikeji", 
                        operation: constants.GET_TI
                    }, 
                    operation: constants.SYM.L_THAN, 
                    right: {
                        name: "aropo", 
                        operation: constants.GET_TI
                    }, 
                    value: null
                }, 
                operation: constants.SYM.AND, 
                right: {
                    left: {
                        name: "ikeji", 
                        operation: constants.GET_TI
                    }, 
                    operation: constants.SYM.G_THAN, 
                    right: {
                        left: null, 
                        operation: null, 
                        right: null, 
                        value: 0
                    }, 
                    value: null
                }, 
                value: null
            }, 
            operation: constants.KW.NIGBATI
        }

        expect(kwNodeNigbati.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return valid nigbati node for nested blocks", () => {
        parser.lexer().inputStream.code = `${constants.KW.NIGBATI} ((ikeji < aropo) && (ikeji > 0)) {
            ${constants.KW.SOPE} "a jura wa lo tijakadi ko";
            ${constants.KW.TI} ikeji = ikeji + 1;
            ${constants.KW.NIGBATI} ((ikeji < aropo) && (ikeji > 0)) {
                ${constants.KW.SOPE} "a jura wa lo tijakadi ko";
                ${constants.KW.TI} ikeji = ikeji + 1;
            }
        }`;

        expect(kwNodeNigbati.getNode.call(parser)).toBeTruthy();
    });

    test("it should throw an error when given invalid construct", () => {
        parser.lexer().inputStream.code = `${constants.KW.NIGBATI} ikeji < aropo) && (ikeji > 0)) {
            ${constants.KW.SOPE} "a jura wa lo tijakadi ko";
            ${constants.KW.TI} ikeji = ikeji + 1;
        }`;

        expect(() => {
            kwNodeNigbati.getNode.call(parser)
        }).toThrow();
    });
});