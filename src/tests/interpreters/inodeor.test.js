jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeOr = require("../../interpreters/inodeor.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodejeki.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeOr test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should return ooto for an or true condition", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 5 > 4 || 3 < 2;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeOr.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.OOTO);
    });

    test("it should return iro for an or false condition", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 5 > 6 || 5 > 7;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeOr.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.IRO);
    });

    test("it should get the value of a variable and test it in an condition", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 6;
            ${constants.KW.JEKI} b = a > 6 || 5 > 7;
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "b")).toEqual(constants.KW.IRO);
    });
});
