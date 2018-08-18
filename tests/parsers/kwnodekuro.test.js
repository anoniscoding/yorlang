const kwNodeKuro = require("../../parsers/keywordnodes/kwnodekuro.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("KwNodeKuro test suite", () => {
    let parser;

    beforeEach(() => {
        const code = `${constants.KW.KURO};`;
        parser = new Parser(new Lexer(new InputStream(code)));
    });

    test("It should return a kúrò node ast", () => {
        const expectedNode = {operation: constants.KW.KURO};

        expect(kwNodeKuro.getNode.call(parser))
            .toEqual(expectedNode);
    });

    test("It should skip the semicolon after the keyword kúrò", () => {
        kwNodeKuro.getNode.call(parser);
        
        expect(parser.lexer.peek()).toBe(null);
    });
});