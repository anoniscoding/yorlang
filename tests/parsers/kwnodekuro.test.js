const kwNodeKuro = require("../../parsers/kwnodekuro.js")
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("KwNodeKuro test suite", () => {
    let parser;

    beforeEach(() => {
        const code = "kúrò;";
        parser = new Parser(new Lexer(new InputStream(code)));
    })

    test("It should return a kuro node ast", () => {
        const expectedNode = {operation: constants.KW.KURO};

        expect(kwNodeKuro.setParser(parser).getNode())
            .toEqual(expectedNode);
    });

    test("It should skip the semicolon after the keyword kúrò", () => {
        kwNodeKuro.setParser(parser).getNode();
        
        expect(parser.lexer.peek()).toBe(null);
    });
});