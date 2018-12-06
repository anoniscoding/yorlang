const path = require('path');

const kwNodeIse = require(path.join(rootDir, "parsers/keyword-nodes/kwnodeise.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("KwNodeIse test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("it should return valid ise node", () => {
        parser.lexer().inputStream.code = `${constants.KW.ISE} teOruko(a,b) {}`;

        const expectedNode = {
            body: [], 
            name: "teOruko", 
            operation: constants.KW.ISE, 
            paramTokens: [
                {
                    type: constants.VARIABLE, 
                    value: "a"
                }, 
                {
                    type: constants.VARIABLE, 
                    value: "b"
                }
            ]
        };

        expect(kwNodeIse.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return valid ise node for nested blocks", () => {
        parser.lexer().inputStream.code = `${constants.KW.ISE} koOruko(orukoMi) {
            ${constants.KW.JEKI} oruko = orukoMi;
            
            ${constants.KW.FUN} (${constants.KW.JEKI} i =0; i < 10; ${constants.KW.JEKI} i = i + 1;) {
                ${constants.KW.SOPE} i;
            }
        
            ${constants.KW.ISE} teAkori() {
                ${constants.KW.SOPE} "adupe";
            }
        
            ${constants.KW.PADA} teAkori();
        }`;

        expect(kwNodeIse.getNode.call(parser)).toBeTruthy();
    });

    test("it should fail to create an ise node within an invalid block", () => {
        parser.lexer().inputStream.code = `${constants.KW.ISE} koOruko(orukoMi) {
            ${constants.KW.JEKI} oruko = orukoMi;
            
            ${constants.KW.FUN} (tí i =0; i < 10; tí i = i + 1;) {
                ${constants.KW.SOPE} i;

                ${constants.KW.ISE} teAkori() {
                    ${constants.KW.SOPE} "adupe";
                }
            }
        
            ${constants.KW.PADA} teAkori();
        }`;

        expect(() => kwNodeIse.getNode.call(parser)).toThrow();
    });

    test("it should throw an error when given invalid ise", () => {
        parser.lexer().inputStream.code = `${constants.KW.ISE} (teOruko(a,b) {}`;

        expect(() => {
            kwNodeIse.getNode.call(parser)
        }).toThrow();
    });
});