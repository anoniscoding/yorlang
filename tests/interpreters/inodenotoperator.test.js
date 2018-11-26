const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iNodeNotOperator = require("../../interpreters/inodeminus.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeNotOperator test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment());
    });

    test("it should apply not operation and return iro", () => {
        parser.lexer().inputStream.code = `${constants.KW.TI} a = ${constants.SYM.EXCLAMATION_POINT} ${constants.KW.OOTO};`;

        mainInterpreter.interpreteProgram(parser);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toBe(constants.KW.IRO);
    });

    test("it should apply not operation and return ooto", () => {
        parser.lexer().inputStream.code = `${constants.KW.TI} a = ${constants.SYM.EXCLAMATION_POINT} ${constants.KW.IRO};`;

        mainInterpreter.interpreteProgram(parser);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toBe(constants.KW.OOTO);
    });

    test("it should apply not operation and return iro for a valid variable", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.TI} a = 5;
            ${constants.KW.TI} a = ${constants.SYM.EXCLAMATION_POINT} a;
        `;

        mainInterpreter.interpreteProgram(parser);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toBe(constants.KW.IRO);
    });
});