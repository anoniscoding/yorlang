const kwNodeIse = require("../../../parsers/keywordnodes/kwnodeise.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeIse test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return valid ise node", () => {
        parser.lexer.inputStream.code = `${constants.KW.ISE} teOruko(a,b) {}`;

        const expectedNode = {
            body: [], 
            name: "teOruko", 
            operation: constants.KW.ISE, 
            vars: [
                {
                    type: constants.VARIABLE, 
                    value: "a"
                }, 
                {
                    type: constants.VARIABLE, 
                    value: "b"
                }
            ]
        }

        expect(kwNodeIse.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return valid ise node for nested blocks", () => {
        parser.lexer.inputStream.code = `${constants.KW.ISE} koOruko(orukoMi) {
            tí oruko = orukoMi;
            
            ${constants.KW.FUN} (tí i =0; i < 10; tí i = i + 1;) {
                sopé i;
            }
        
            ${constants.KW.ISE} teAkori() {
                sopé "adupe";
            }
        
            ${constants.KW.PADA} teAkori();
        }`;

        expect(kwNodeIse.getNode.call(parser)).toBeTruthy();
    });

    test("it should throw an error when given invalid ise", () => {
        parser.lexer.inputStream.code = `${constants.KW.ISE} (teOruko(a,b) {}`;

        expect(() => {
            kwNodeIse.getNode.call(parser)
        }).toThrow();
    });
});