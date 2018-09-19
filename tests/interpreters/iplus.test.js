const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iPlus = require("../../interpreters/iplus.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodeti.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("IPlust test suite", () => {
    let interpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        interpreter = new MainInterpreter();
    });

    test("it should interprete a plus operation", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = 3 + 5;`;
        const ast = kwNodeTi.getNode.call(parser);
        expect(iPlus.interpreteNode.call(interpreter, ast.right)).toBe(8);
    });
});