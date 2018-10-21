const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeSe test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment());
        global.console.log = jest.fn();
    });

    test("it should interprete the se keyword and run the then block ", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = 7;
            ${constants.KW.SE} (a > 6) {
                ${constants.KW.TI} a = 6 * 3;
                ${constants.KW.SOPE} a;
            } ${constants.KW.TABI} {
                ${constants.KW.TI} a = 6 * 2;
                ${constants.KW.SOPE} a;
            }
        `;

        const program = parser.parseProgram();
        mainInterpreter.astList = program.astList;
        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(18);
    });

    test("it should interprete the se keyword and run the else block ", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = 6;
            ${constants.KW.SE} (a > 6) {
                ${constants.KW.TI} a = 6 * 3;
                ${constants.KW.SOPE} a;
            } ${constants.KW.TABI} {
                ${constants.KW.TI} a = 6 * 2;
                ${constants.KW.SOPE} a;
            }
        `;

        const program = parser.parseProgram();
        mainInterpreter.astList = program.astList;
        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(12);
    });

    test("it should interprete nested se keyword and run the then block ", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} a = 7;
            ${constants.KW.SE} (a > 6) {
                ${constants.KW.TI} a = 6 * 3;
                ${constants.KW.SOPE} a;

                ${constants.KW.SE} (a > 14) {
                    ${constants.KW.TI} a = 6 * 5;
                    ${constants.KW.SOPE} a;
                }
            } ${constants.KW.TABI} {
                ${constants.KW.TI} a = 6 * 2;
                ${constants.KW.SOPE} a;
            }
        `;

        const program = parser.parseProgram();
        mainInterpreter.astList = program.astList;
        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(18);
        expect(global.console.log).toHaveBeenCalledWith(30);
    });
});