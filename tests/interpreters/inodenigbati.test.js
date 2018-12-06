const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const Environment = require(path.join(rootDir, "environment.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const Lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("INodeNigbati test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should interprete the nigbati keyword with kuro keyword", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 0;
            ${constants.KW.NIGBATI} (a < 3) {
                ${constants.KW.SOPE} a;
                ${constants.KW.JEKI} a = a + 1;
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
            ${constants.KW.JEKI} a = 0;
            ${constants.KW.NIGBATI} (a < 3) {
                ${constants.KW.SOPE} a;
                ${constants.KW.JEKI} a = a + 1;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(3);
    });

    test("it should interprete nested nigbati keyword", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 0;
            ${constants.KW.NIGBATI} (a < 3) {
                ${constants.KW.SOPE} a;
                ${constants.KW.JEKI} a = a + 1;
                ${constants.KW.JEKI} b = a + 1;
                ${constants.KW.NIGBATI} (b < 3) {
                    ${constants.KW.SOPE} "anu";
                    ${constants.KW.JEKI} b = b + 1;
                }
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(4);
    });
});