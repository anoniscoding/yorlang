const kwNodeYi = require("../../parsers/kwnodeyi.js")
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("KwNodeSope test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return a valid yi node", () => {
        parser.lexer.inputStream.code = `${constants.KW.YI} (name) {
            ${constants.KW.EJO} "anu":
                ${constants.KW.SOPE} "it is anu";
                ${constants.KW.KURO};
            ${constants.KW.EJO} "femi": 
                ${constants.KW.SOPE} "it femi";
                ${constants.KW.KURO};
            ${constants.KW.PADASI}: 
                ${constants.KW.SOPE} "mi o mo";      
        }`;

        const expectedNode = {
            body: [
                {
                    body: [
                        {
                            body: {
                                left: null, 
                                operation: null, 
                                right: null, 
                                value: "it is anu"
                            }, 
                            operation: constants.KW.SOPE
                        }, 
                        {
                            operation: constants.KW.KURO
                        }
                    ], 
                    ejovalue: {
                        value: "anu",
                        left: null,
                        right: null,
                        operation: null
                    }, 
                    operation: constants.KW.EJO
                }, 
                {
                    body: [
                        {
                            body: {
                                left: null, 
                                operation: null, 
                                right: null, 
                                value: "it femi"
                            }, 
                            operation: constants.KW.SOPE
                        }, 
                        {
                            operation: constants.KW.KURO
                        }
                    ], 
                    ejovalue: {
                        value: "femi",
                        left: null,
                        right: null,
                        operation: null
                    }, 
                    operation: constants.KW.EJO
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
                name: "name", 
                operation: constants.GET_TI
            }
        };

        expect(kwNodeYi.setParser(parser).getNode()).toEqual(expectedNode);
    });

    test("it should return a valid yi node", () => {
        parser.lexer.inputStream.code = `${constants.KW.YI} name) {
            ${constants.KW.EJO} "anu":
                ${constants.KW.SOPE} "it is anu";
                ${constants.KW.KURO};
            ${constants.KW.EJO} "femi": 
                ${constants.KW.SOPE} "it femi";
                ${constants.KW.KURO};
            ${constants.KW.PADASI}: 
                ${constants.KW.SOPE} "mi o mo";      
        }`;

        expect(() => {
            kwNodeYi.setParser(parser).getNode();
        }).toThrow();
    });

});