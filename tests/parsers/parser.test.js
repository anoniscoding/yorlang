const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("KwNodeKuro test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("IsPunctuation - it should confirm that the given token is a punctuation and it matches the next token in the stream", () => {
        parser.lexer.inputStream.code = `${constants.SYM.L_PAREN}`;

        expect(parser.isPunctuation(constants.SYM.L_PAREN)).toBeTruthy();
    });

    test("IsPunctuation - it should confirm that the next token in the stream does not match the punctuation given", () => {
        parser.lexer.inputStream.code = `${constants.SYM.TI}`;

        expect(parser.isPunctuation(constants.SYM.L_PAREN)).toBeFalsy();
    });

    test("IsOperator - it should confirm that the given token is an operator and it matches the next token in the stream", () => {
        parser.lexer.inputStream.code = `${constants.SYM.ASSIGN}`;

        expect(parser.isOperator(constants.SYM.ASSIGN)).toBeTruthy();
    });

    test("IsOperator - it should confirm that the next token in the stream does not match the operator given", () => {
        parser.lexer.inputStream.code = `${constants.SYM.PIPE}`;

        expect(parser.isOperator(constants.SYM.ASSIGN)).toBeFalsy();
    });

    test("IsKeyword - it should confirm that the given token is an operator and it matches the next token in the stream", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI}`;

        expect(parser.isKeyword(constants.KW.TI)).toBeTruthy();
    });

    test("IsKeyword - it should confirm that the next token in the stream does not match the keyword given", () => {
        parser.lexer.inputStream.code = `${constants.SYM.PIPE}`;

        expect(parser.isKeyword(constants.KW.TI)).toBeFalsy();
    });

    test("SkipPunctuation - it should skip the punctuation token L_PAREN", () => {
        parser.lexer.inputStream.code = `${constants.SYM.L_PAREN};`;
        parser.skipPunctuation(constants.SYM.L_PAREN);

        expect(parser.isPunctuation(constants.SYM.STATEMENT_TERMINATOR)).toBeTruthy();
    });

    test("SkipPunctuation - it should fail to skip the punctuation token R_PAREN", () => {
        parser.lexer.inputStream.code = `${constants.SYM.L_PAREN};`;

        expect(() => parser.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR)).toThrow();
    });

    test("SkipOperator - it should skip the operator token MULTIPLY", () => {
        parser.lexer.inputStream.code = `${constants.SYM.MULTIPLY};`;
        parser.skipOperator(constants.SYM.MULTIPLY);

        expect(parser.isPunctuation(constants.SYM.STATEMENT_TERMINATOR)).toBeTruthy();
    });

    test("SkipOperator - it should fail to skip the operator token BINARY_AND", () => {
        parser.lexer.inputStream.code = `${constants.SYM.BINARY_AND};`;

        expect(() => parser.skipOperator(constants.SYM.ASSIGN)).toThrow();
    });

    test("SkipKeyword - it should skip the keyword token TI", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI};`;
        parser.skipKeyword(constants.KW.TI);

        expect(parser.isPunctuation(constants.SYM.STATEMENT_TERMINATOR)).toBeTruthy();
    });

    test("SkipKeyword - it should fail to skip the keyword token TI", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI};`;

        expect(() => parser.skipKeyword(constants.KW.SOPE)).toThrow();
    });

    test("GetCurrentTokenValue - it should get the current token value", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI};`;

        expect(parser.getCurrentTokenValue()).toBeTruthy();
    });

    test("ParseExpression - it should return node number literal", () => {
        parser.lexer.inputStream.code = `7.51;`;

        const expectedNode = {
            left: null,
            operation: null,
            right: null,
            value: 7.51,
        };

        expect(parser.parseExpression()).toEqual(expectedNode);
    });

    test("ParseExpression - it should return node string literal", () => {
        parser.lexer.inputStream.code = `"beautiful";`;

        const expectedNode = {
           left: null,
           operation: null,
           right: null,
           value: "beautiful",
        };

        expect(parser.parseExpression()).toEqual(expectedNode);
    });

    test("ParseExpression - it should return node variable literal", () => {
        parser.lexer.inputStream.code = `name;`;

        const expectedNode = {
            name: "name",
            operation: constants.GET_TI
        };

        expect(parser.parseExpression()).toEqual(expectedNode);
    });

    test("ParseExpression - it should return node array literal", () => {
        parser.lexer.inputStream.code = `[1,a];`;

        const expectedNode = {
            body: [
                {
                    type: constants.NUMBER,
                    value: 1
                },
                {
                    type: constants.VARIABLE,
                    value: "a"
                }
            ],
            operation: constants.ARRAY
        };

        expect(parser.parseExpression()).toEqual(expectedNode);
    });

    test("ParseExpression - it should return node array element literal", () => {
        parser.lexer.inputStream.code = `a[0];`;

        const expectedNode = {
            name: "a",
            index: 0,
            operation: constants.ARRAY
        };

        expect(parser.parseExpression()).toEqual(expectedNode);
    });

    test("ParseExpression - it should return node literal", () => {
        parser.lexer.inputStream.code = `((i < 200) && (i > 0));`;

        const expectedNode = {
               left:  {
                 left:  {
                   name: "i",
                   operation: constants.GET_TI,
                 },
                 operation: constants.SYM.L_THAN,
                 right:  {
                   left: null,
                   operation: null,
                   right: null,
                   value: 200,
                 },
                 value: null,
               },
               operation: constants.SYM.AND,
               right:  {
                 left:  {
                   name: "i",
                   operation: constants.GET_TI,
                 },
                 operation: constants.SYM.G_THAN,
                 right:  {
                   left: null,
                   operation: null,
                   right: null,
                   value: 0,
                 },
                 value: null,
               },
               value: null,
        };

        expect(parser.parseExpression()).toEqual(expectedNode);
    });

    test("ParseCallIse - it should return node callIse", () => {
        parser.lexer.inputStream.code = `koOruko("anu");;`;

        const expectedNode = {
               args: [
                  {
                   type: "string",
                   value: "anu",
                 },
               ],
               name: "koOruko",
               operation: "callIse",
            };

        expect(parser.parseCallIse(parser.lexer.next())).toEqual(expectedNode);
    });
});