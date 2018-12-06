jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const kwNodeYi = require("../../../parsers/keywordnodes/kwnodeyi.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeYi test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return a valid yi node", () => {
        parser.lexer().inputStream.code = `${constants.KW.YI} (firstname) {
            ${constants.KW.IRU} "anu":
                ${constants.KW.SOPE} "it is anu";
            ${constants.KW.IRU} "femi": 
                ${constants.KW.SOPE} "it femi";
            ${constants.KW.PADASI}: 
                ${constants.KW.SOPE} "mi o mo";      
        }`;

        const expectedNode = {
            yibody: [
                {
                    IRUbody: [
                        {
                            body: {
                                left: null, 
                                operation: null, 
                                right: null, 
                                value: "it is anu"
                            }, 
                            operation: constants.KW.SOPE
                        }
                    ], 
                    IRUvalue: {
                        value: "anu",
                        left: null,
                        right: null,
                        operation: null
                    }, 
                    operation: constants.KW.IRU
                }, 
                {
                    IRUbody: [
                        {
                            body: {
                                left: null, 
                                operation: null, 
                                right: null, 
                                value: "it femi"
                            }, 
                            operation: constants.KW.SOPE
                        }
                    ], 
                    IRUvalue: {
                        value: "femi",
                        left: null,
                        right: null,
                        operation: null
                    }, 
                    operation: constants.KW.IRU
                }
            ], 
            operation: constants.KW.YI, 
            padasi: [
                {
                    body: {
                        left: null, 
                        operation: null, 
                        right: null, 
                        value: "mi o mo"
                    }, 
                    operation: constants.KW.SOPE
                }
            ], 
            yivalue: {
                name: "firstname", 
                operation: constants.GET_JEKI
            }
        };

        expect(kwNodeYi.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should throw an error when an invalid yi node is given", () => {
        parser.lexer().inputStream.code = `${constants.KW.YI} name) {
            ${constants.KW.IRU} "anu":
                ${constants.KW.SOPE} "it is anu";
                ${constants.KW.KURO};
            ${constants.KW.IRU} "femi": 
                ${constants.KW.SOPE} "it femi";
                ${constants.KW.KURO};
            ${constants.KW.PADASI}: 
                ${constants.KW.SOPE} "mi o mo";      
        }`;

        expect(() => {
            kwNodeYi.getNode.call(parser);
        }).toThrow();
    });

});