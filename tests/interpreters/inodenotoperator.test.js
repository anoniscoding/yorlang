const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const Environment = require(path.join(rootDir, "environment.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("INodeNotOperator test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should apply not operation and return iro", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = ${constants.SYM.EXCLAMATION_POINT} ${constants.KW.OOTO};`;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toBe(constants.KW.IRO);
    });

    test("it should apply not operation and return ooto", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = ${constants.SYM.EXCLAMATION_POINT} ${constants.KW.IRO};`;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toBe(constants.KW.OOTO);
    });

    test("it should apply not operation and return iro for a valid variable", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 5;
            ${constants.KW.JEKI} a = ${constants.SYM.EXCLAMATION_POINT} a;
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toBe(constants.KW.IRO);
    });
});