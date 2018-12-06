jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const Lexer = require("../lexer.js");
const InputStream = require("../inputStream.js");
const constants = require("../constants.js");

describe("Lexer Tests", () => {
    let lexer;

    beforeEach(() => {
       lexer = new Lexer(new InputStream()); 
    });

    test("IsWhiteSpace - it should confirm that they are whitespaces", () => {
        constants.LIST.WHITESPACES.forEach((ws_char) => {
            expect(lexer.isWhiteSpace(ws_char)).toBe(true);
        });
    });

    test("IsWhiteSpace - it should confirm that it is not a whitespace", () => {
        expect(lexer.isWhiteSpace("\a")).toBe(false);
    });

    test("isPunctuation - it should confirm that they are punctuations", () => {
        constants.LIST.PUNCTUATIONS.forEach((punc_char) => {
            expect(lexer.isPunctuation(punc_char)).toBe(true);
        });    
    });

    test("isPunctuation - it should confirm that it is not a punctuation", () => {
        expect(lexer.isPunctuation("+")).toBe(false);
    });

    test("getIdentifierWithoutAccentMarks - it should remove accent marks from string", () => {
        expect(lexer.getIdentifierWithoutAccentMarks("jẹ́kí")).toBe("jeki");
    });

    test("IsIdentifier - it should confirm that it is an identifier", () => {
        expect(lexer.isIdentifier("í")).toBe(true);
    });

    test("IsIdentifier - it should confirm that it is not an identifier", () => {
        expect(lexer.isIdentifier("î")).toBe(false);
    });

    test("isOperator - it should confirm that they are operators", () => {
        constants.LIST.OPERATORS.forEach((op_char) => {
            expect(lexer.isOperator(op_char)).toBe(true);
        });    
    });

    test("isOperator - it should confirm that it is not an operator", () => {
        expect(lexer.isOperator("2")).toBe(false);
    });

    test("isKeyword - it should confirm that they are keywords", () => {
        constants.LIST.KEYWORDS.forEach((kw_char) => {
            expect(lexer.isKeyword(kw_char)).toBe(true);
        });    
    });

    test("isKeyword - it should confirm that it is not a keyword", () => {
        expect(lexer.isKeyword("aldkfjdkfjekj")).toBe(false);
    });

    test("IsDigit - it should confirm that it is a digit", () => {
        expect(lexer.isDigit("34")).toBe(true);
    });

    test("IsDigit - it should confirm that it is not a digit", () => {
        expect(lexer.isDigit("î")).toBe(false);
    });

    test("ReadWhile - it should continue to concatenate chars to string as long as there are still characters left to concatenate and the given predicate is true", () => {
        lexer.inputStream.code = "23";

        expect(lexer.readWhile(lexer.isDigit)).toBe("23");
    });

    test("ReadWhile - it should stop concatenating chars to string when the given predicate is false", () => {
        lexer.inputStream.code = "a23";

        expect(lexer.readWhile(lexer.isIdentifier)).toBe("a");
    });

    test("ReadString - it should identify a string literal, while stripping off the quote symbols, and return the string token", () => {
        lexer.inputStream.code = `"a23"`;

        expect(lexer.readString()).toEqual({ type: constants.STRING, value: "a23" });
    });

    test("ReadString - it should identify an incomplete string literal, and throw an error msg ", () => {
        lexer.inputStream.code = `"a23`;

        expect(() => {
            lexer.readString();
        }).toThrow();
    });

    test("ReadIdentifier - it should return an variable token", () => {
        lexer.inputStream.code = "name";

        expect(lexer.readIdentifier()).toEqual({type: constants.VARIABLE, value: "name"});
    });

    test("ReadIdentifier - it should return a keyword token", () => {
        lexer.inputStream.code = `${constants.KW.JEKI}`;

        expect(lexer.readIdentifier()).toEqual({type: constants.KEYWORD, value: `${constants.KW.JEKI}`});
    });

    test("ReadNumber - it should return a number token", () => {
        lexer.inputStream.code = "50.32";

        expect(lexer.readNumber()).toEqual({type: constants.NUMBER, value: 50.32});
    });

    test("ReadNumber - it should return a number token with a single decimal points", () => {
        lexer.inputStream.code = "50.32.5";

        expect(lexer.readNumber()).toEqual({type: constants.NUMBER, value: 50.32});
    });

    test("SkipComments - it should skip all comments", () => {
        lexer.inputStream.code = `${constants.SYM.COMMENT} comment ${constants.SYM.NEW_LINE}a`;
        lexer.skipComments();
        expect(lexer.inputStream.peek()).toBe("a");
    });

    test("SkipWhiteSpaces - it should should skip whitespaces", () => {
        lexer.inputStream.code = `    \n\t${constants.KW.JEKI}`;
        expect(lexer.next()).toEqual({type: constants.KEYWORD, value: `${constants.KW.JEKI}`});
    });

    test("ReadNext - it should return the next token", () => {
        lexer.inputStream.code = `${constants.KW.SOPE} 2`;

        expect(lexer.readNext()).toEqual({type: constants.KEYWORD, value: `${constants.KW.SOPE}`});
    });

    test("ReadNext - it should throw an error when it can't recognize a token", () => {
        lexer.inputStream.code = "â";

        expect(() => {
            lexer.readNext()
        }).toThrow("Cant handle character  'â'");
    });

    test("Peek - it peek at the next token without discarding it", () => {
        lexer.inputStream.code = "name";

        expect(lexer.peek()).toEqual({type: constants.VARIABLE, value: "name"});
    });

    test("Next - it peek at the next token and also discard it", () => {
        lexer.inputStream.code = "name";

        expect(lexer.next()).toEqual({type: constants.VARIABLE, value: "name"});
        expect(lexer.next()).toBe(null);
    });

    test("IsNotEndOfFile - It should confirm that the lexer has not read in the last token", () => {
        lexer.inputStream.code = "abc";

        expect(lexer.isNotEndOfFile()).toBe(true);
    });

    test("IsEndOfFile - It should confirm that the lexer has read in the last token", () => {
        lexer.inputStream.code = "";

        expect(lexer.isEndOfFile()).toBe(true);
    });
});