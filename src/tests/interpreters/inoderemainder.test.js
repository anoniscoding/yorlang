jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iRemainder = require("../../interpreters/inoderemainder.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodejeki.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("IRemainder test suite", () => {
    test("it should interprete a remainder operation", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 15 % 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iRemainder.interpreteNode.call(new MainInterpreter(), node.right)).toBe(0);
    });

    test("it should calculate remainder with non-zero divisor", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 17 % 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iRemainder.interpreteNode.call(new MainInterpreter(), node.right)).toBe(2);
    });

    test("it should throw error for remainder division by zero", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        let mainInterpreter = new MainInterpreter();
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 10 % 0;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(() => iRemainder.interpreteNode.call(mainInterpreter, node.right)).toThrow();
    });

    test("it should throw error for remainder with variable divisor equal to zero", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        let mainInterpreter = new MainInterpreter();
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} divisor = 0;
            ${constants.KW.JEKI} a = 10 % divisor;
        `;
        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });
});
