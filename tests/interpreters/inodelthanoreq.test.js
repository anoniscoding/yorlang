const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeLthanOrEq = require("../../interpreters/inodelthanoreq.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodeti.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeLessThanOrEqual test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment());
    });

    test("it should return ooto for a lesser than or equal true condition", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = 5 <= 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeLthanOrEq.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.OOTO);
    });

    test("it should return iro for a lesser than or equal false condition", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = 5 <= 4;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeLthanOrEq.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.IRO);
    });

    test("it should get the value of a variable and test it in a lesser than or equal condition", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = 6;
            ${constants.KW.TI} b = a <= 7;
        `;

        const program = parser.parseProgram();
        mainInterpreter.astList = program.astList;
        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "b")).toEqual(constants.KW.OOTO);
    });
});