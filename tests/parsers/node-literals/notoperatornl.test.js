const path = require('path');

const notOperatorNl = require(path.join(rootDir, "parsers/node-literals/notoperatornl.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const Lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("NotOperatorNl test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("It should parse valid not operator with boolean body", () => {
        parser.lexer().inputStream.code = `${constants.SYM.EXCLAMATION_POINT} ${constants.KW.OOTO}`;

        const expectedNode = {
            operation: constants.SYM.EXCLAMATION_POINT, 
            body: {
                left: null, 
                operation: null, 
                right: null, 
                value: constants.KW.OOTO
            }
        };

        expect(notOperatorNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should parse valid not operator with variable body", () => {
        parser.lexer().inputStream.code = `${constants.SYM.EXCLAMATION_POINT} isGood;`;

        const expectedNode = {
            operation: constants.SYM.EXCLAMATION_POINT, 
            body: {
                operation: constants.GET_JEKI, 
                name: "isGood"
            }
        };

        expect(notOperatorNl.getNode.call(parser)).toEqual(expectedNode);
    });

});