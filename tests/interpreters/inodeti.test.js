const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeTi = require("../../interpreters/inodeti.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodeti.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeTi test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment());
    });

    test("it should assign expression to a variable", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = ((5 + 2) * (2 - 4)) / 2;`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toBe(-7);
    });

    test("it should assign floating point number to a variable", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = 3.142;`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toBe(3.142);
    });

    test("it should assign string to a variable", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = "anu";`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toBe("anu");
    });

    test("it should assign an array literal to a variable", () => {
        parser.lexer.inputStream.code = `${constants.KW.TI} a = [1,2];`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toEqual([1,2]);
    });

    test("it should interprete expression that contains a variable reference", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = 5;
            ${constants.KW.TI} b = ((a + 2) * (2 - 4)) / 2;
        `;

        const program = parser.parseProgram();
        mainInterpreter.interpreteProgram(program.astList);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "b")).toBe(-7);
    });

    test("it should assign value to an array element", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = [1,2];
            ${constants.KW.TI} a[0] = "funmi";
        `;

        const program = parser.parseProgram();
        mainInterpreter.interpreteProgram(program.astList);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toEqual(["funmi",2]);
    });

    test("it should assign value to a multi-dimensional array element", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = [[1,2], [[3,4], 5]];
            ${constants.KW.TI} a[1][0][0] = "funmi";
        `;

        const program = parser.parseProgram();
        mainInterpreter.interpreteProgram(program.astList);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toEqual([ [1,2], [["funmi",4],5] ]);
    });

    test("it should fail to assign value to an invalid multi-dimensional array element", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = [[1,2], [[3,4], 5]];
            ${constants.KW.TI} a[1][0][0][0] = "funmi";
        `;

        const program = parser.parseProgram();
        expect(() => mainInterpreter.interpreteProgram(program.astList)).toThrow();
    });

    test("it should assign transformed (uppercase) string to variablet", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = síLẹ́tàŃlá("funmi");
        `;

        const program = parser.parseProgram();
        mainInterpreter.interpreteProgram(program.astList);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toBe("FUNMI");
    });

    test("it should assign transformed (lowercase) string to variable", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = síLẹ́tàkékeré("FUNMI");
        `;

        const program = parser.parseProgram();
        mainInterpreter.interpreteProgram(program.astList);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "a")).toBe("funmi");
    });
});