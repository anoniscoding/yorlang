const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeAnd = require("../../interpreters/inodeand.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodeti.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeAnd test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment());
    });

    test("it should return ooto for an and true condition", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = 5 > 4 && 3 > 2;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeAnd.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.OOTO);
    });

    test("it should return iro for an and false condition", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = 5 > 6 && 5 > 7;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeAnd.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.IRO);
    });

    test("it should get the value of a variable and test it in an and condition", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = 6;
            ${constants.KW.TI} b = a > 6 && 5 > 7;
        `;

        const program = parser.parseProgram();
        mainInterpreter.astList = program.astList;
        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "b")).toEqual(constants.KW.IRO);
    });
});