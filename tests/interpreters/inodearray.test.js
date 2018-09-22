const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iNodeArray = require("../../interpreters/inodearray.js");
const Environment = require("../../environment.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodeti.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeArray test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment());
    });

    test("it should return an array literal", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = [1,2];`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeArray.interpreteNode.call(mainInterpreter, node.right)).toEqual([1,2]);
    });

    test("it should return an array literal", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = [];`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeArray.interpreteNode.call(mainInterpreter, node.right)).toEqual([]);
    });
});