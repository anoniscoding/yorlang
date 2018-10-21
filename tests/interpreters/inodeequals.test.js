const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeEquals = require("../../interpreters/inodeequals.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodeti.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeEquals test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment());
    });

    test("it should return ooto for an equal true condition", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = 5 == 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeEquals.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.OOTO);
    });

    test("it should return iro for an equal false condition", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = 5 == 4;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeEquals.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.IRO);
    });

    test("it should get the value of a variable and test it in an equal condition", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = ${constants.KW.OOTO};
            ${constants.KW.TI} b = a == ${constants.KW.OOTO};
        `;

        const program = parser.parseProgram();
        mainInterpreter.astList = program.astList;
        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "b")).toEqual(constants.KW.OOTO);
    });
});