const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iMultiply = require("../../interpreters/inodemultiply.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodeti.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("IMultiply test suite", () => {

    test("it should interprete a multiplication operation", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer.inputStream.code = `${constants.KW.TI} a = 3 * 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iMultiply.interpreteNode.call(new MainInterpreter(), node.right)).toBe(15);
    });
});