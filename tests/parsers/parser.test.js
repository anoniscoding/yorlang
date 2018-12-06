const path = require('path');

const Parser = require(path.join(rootDir, "parsers/parser.js"));
const lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("Parser test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("isNextTokenPunctuation - it should confirm that the given token is a punctuation and it matches the next token in the stream", () => {
        parser.lexer().inputStream.code = `${constants.SYM.L_PAREN}`;

        expect(parser.isNextTokenPunctuation(constants.SYM.L_PAREN)).toBeTruthy();
    });

    test("isNextTokenPunctuation - it should confirm that the next token in the stream does not match the punctuation given", () => {
        parser.lexer().inputStream.code = `${constants.SYM.JEKI}`;

        expect(parser.isNextTokenPunctuation(constants.SYM.L_PAREN)).toBeFalsy();
    });

    test("isNextTokenOperator - it should confirm that the given token is an operator and it matches the next token in the stream", () => {
        parser.lexer().inputStream.code = `${constants.SYM.ASSIGN}`;

        expect(parser.isNextTokenOperator(constants.SYM.ASSIGN)).toBeTruthy();
    });

    test("isNextTokenOperator - it should confirm that the next token in the stream does not match the operator given", () => {
        parser.lexer().inputStream.code = `${constants.SYM.PIPE}`;

        expect(parser.isNextTokenOperator(constants.SYM.ASSIGN)).toBeFalsy();
    });

    test("isNextTokenKeyword - it should confirm that the given token is an operator and it matches the next token in the stream", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI}`;

        expect(parser.isNextTokenKeyword(constants.KW.JEKI)).toBeTruthy();
    });

    test("isNextTokenKeyword - it should confirm that the next token in the stream does not match the keyword given", () => {
        parser.lexer().inputStream.code = `${constants.SYM.PIPE}`;

        expect(parser.isNextTokenKeyword(constants.KW.JEKI)).toBeFalsy();
    });

    test("SkipPunctuation - it should skip the punctuation token L_PAREN", () => {
        parser.lexer().inputStream.code = `${constants.SYM.L_PAREN};`;
        parser.skipPunctuation(constants.SYM.L_PAREN);

        expect(parser.isNextTokenPunctuation(constants.SYM.STATEMENT_TERMINATOR)).toBeTruthy();
    });

    test("SkipPunctuation - it should fail to skip the punctuation token R_PAREN", () => {
        parser.lexer().inputStream.code = `${constants.SYM.L_PAREN};`;

        expect(() => parser.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR)).toThrow();
    });

    test("SkipOperator - it should skip the operator token MULTIPLY", () => {
        parser.lexer().inputStream.code = `${constants.SYM.MULTIPLY};`;
        parser.skipOperator(constants.SYM.MULTIPLY);

        expect(parser.isNextTokenPunctuation(constants.SYM.STATEMENT_TERMINATOR)).toBeTruthy();
    });

    test("SkipOperator - it should fail to skip the operator token BINARY_AND", () => {
        parser.lexer().inputStream.code = `${constants.SYM.BINARY_AND};`;

        expect(() => parser.skipOperator(constants.SYM.ASSIGN)).toThrow();
    });

    test("SkipKeyword - it should skip the keyword token JEKI", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI};`;
        parser.skipKeyword(constants.KW.JEKI);

        expect(parser.isNextTokenPunctuation(constants.SYM.STATEMENT_TERMINATOR)).toBeTruthy();
    });

    test("SkipKeyword - it should fail to skip the keyword token JEKI", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI};`;

        expect(() => parser.skipKeyword(constants.KW.SOPE)).toThrow();
    });

    test("GetCurrentTokenValue - it should get the current token value", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI};`;

        expect(parser.getCurrentTokenValue()).toBeTruthy();
    });

    test("ParseExpression - it should parse array elemement expression", () => {
        parser.lexer().inputStream.code = `a = b[0] = 1`;
          
        const expectedNode = {
            left: {
                left: {
                    name: "a", 
                    operation: constants.GET_JEKI
                }, 
                operation: constants.SYM.ASSIGN, 
                right: {
                    indexNodes: [{"left": null, "operation": null, "right": null, "value": 0}], 
                    name: "b", 
                    operation: constants.ARRAY_ELEM
                }, 
                value: null
            }, 
            operation: constants.SYM.ASSIGN, 
            right: {
                left: null, 
                operation: null, 
                right: null, 
                value: 1
            }, 
            value: null
        };

        expect(parser.parseExpression()).toEqual(expectedNode);
    });

    test("ParseAst - it should parse a function call in a program block", () => {
        parser.lexer().inputStream.code = `koOruko();`;

        const expectedNode = {
            paramValues: [], 
            name: "koOruko", 
            operation: constants.CALL_ISE
        };

        expect(parser.parseAst()).toEqual(expectedNode);
    });

    test("ParseAst - it should fail to parse a non function call in a program block", () => {
        parser.lexer().inputStream.code = `a[];`;

        expect(() => parser.parseAst()).toThrow();
    });
});