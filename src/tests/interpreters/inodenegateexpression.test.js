jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeNegateExpressionNl test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should return negative of 2", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = ${constants.SYM.MINUS}2;`;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toBe(-2);
    });

    test("it should return negative of 5", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} getNum() {
                ${constants.KW.PADA} 5;
            }
            ${constants.KW.JEKI} a = ${constants.SYM.MINUS}getNum();
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toBe(-5);
    });

    test("it should fail to negate a string", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = ${constants.SYM.MINUS}"anu";`;
        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });
});
