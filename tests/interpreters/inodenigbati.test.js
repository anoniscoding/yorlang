jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeNigbati test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should interprete the nigbati keyword with kuro keyword", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.TI} a = 0;
            ${constants.KW.NIGBATI} (a < 3) {
                ${constants.KW.SOPE} a;
                ${constants.KW.TI} a = a + 1;
                ${constants.KW.SE} (a == 2) {
                    ${constants.KW.KURO};
                }
                ${constants.KW.NIGBATI} (a < 2) {
                    ${constants.KW.SOPE} a;
                    ${constants.KW.KURO};
                }
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(3);
    });

    test("it should interprete the nigbati keyword", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.TI} a = 0;
            ${constants.KW.NIGBATI} (a < 3) {
                ${constants.KW.SOPE} a;
                ${constants.KW.TI} a = a + 1;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(3);
    });

    test("it should interprete nested nigbati keyword", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.TI} a = 0;
            ${constants.KW.NIGBATI} (a < 3) {
                ${constants.KW.SOPE} a;
                ${constants.KW.TI} a = a + 1;
                ${constants.KW.TI} b = a + 1;
                ${constants.KW.NIGBATI} (b < 3) {
                    ${constants.KW.SOPE} "anu";
                    ${constants.KW.TI} b = b + 1;
                }
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(4);
    });
});