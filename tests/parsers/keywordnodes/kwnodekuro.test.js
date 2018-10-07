const kwNodeKuro = require("../../../parsers/keywordnodes/kwnodekuro.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeKuro test suite", () => {
    let parser;

    beforeEach(() => {
        const code = `${constants.KW.KURO};`;
        parser = new Parser(new Lexer(new InputStream(code)));
    });

    test("It should return a kúrò node ast when kuro node is expected because it is within a loop", () => {
        const expectedNode = {operation: constants.KW.KURO};
        parser.pushToBlockTypeStack(constants.KW.NIGBATI);

        expect(kwNodeKuro.getNode.call(parser))
            .toEqual(expectedNode);
    });

    test("It should skip the semicolon after an expected keyword kúrò", () => {
        parser.pushToBlockTypeStack(constants.KW.NIGBATI);
        kwNodeKuro.getNode.call(parser);
        
        expect(parser.lexer.peek()).toBe(null);
    });

    test("It should fail to return a kuro node because the kuro keyword is not within a loop", () => {
        expect(() => kwNodeKuro.getNode.call(parser)).toThrow();
    });
});