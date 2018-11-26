const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iRemainder = require("../../interpreters/inoderemainder.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodeti.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("IRemainder test suite", () => {

    test("it should interprete a remainder operation", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer().inputStream.code = `${constants.KW.TI} a = 15 % 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iRemainder.interpreteNode.call(new MainInterpreter(), node.right)).toBe(0);
    });
});