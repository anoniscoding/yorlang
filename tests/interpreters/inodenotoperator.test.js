const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iNodeNotOperator = require("../../interpreters/inodeminus.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeNotOperator test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment());
    });

    test("it should apply not operation and return iro", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer.inputStream.code = `${constants.KW.TI} a = ${constants.SYM.EXCLAMATION_POINT} ${constants.KW.OOTO};`;

        const program = parser.parseProgram();
        mainInterpreter.interpreteProgram(program.astList);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toBe(constants.KW.IRO);
    });

    test("it should apply not operation and return ooto", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer.inputStream.code = `${constants.KW.TI} a = ${constants.SYM.EXCLAMATION_POINT} ${constants.KW.IRO};`;

        const program = parser.parseProgram();
        mainInterpreter.interpreteProgram(program.astList);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toBe(constants.KW.OOTO);
    });

    test("it should apply not operation and return iro for a valid variable", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = 5;
            ${constants.KW.TI} a = ${constants.SYM.EXCLAMATION_POINT} a;
        `;

        const program = parser.parseProgram();
        mainInterpreter.interpreteProgram(program.astList);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toBe(constants.KW.IRO);
    });
});