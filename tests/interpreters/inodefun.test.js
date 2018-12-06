jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeFun test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should interprete fun node", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.FUN} (${constants.KW.JEKI} i = 0; i < 10; ${constants.KW.JEKI} i = i + 1;) {
                ${constants.KW.SOPE} i;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(10);
    });

    test("it should interprete fun node while using helper function to get length of the array", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} num = [1,2,3,4,5,6,7,8,9,10];

            ${constants.KW.FUN} (${constants.KW.JEKI} i = 0; i < ka(num); ${constants.KW.JEKI} i = i + 1;) {
                ${constants.KW.SOPE} num[i];
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(10);
    });

    test("it should interprete nested fun node", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.FUN} (${constants.KW.JEKI} i = 1; i < 3; ${constants.KW.JEKI} i = i + 1;) {
                ${constants.KW.SOPE} i;
                ${constants.KW.FUN} (${constants.KW.JEKI} j = 0; j < 2; ${constants.KW.JEKI} j = i + j;) {
                    ${constants.KW.SOPE} j;
                }
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(5);
    });

    test("it should interprete fun node with kuro keyword", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.FUN} (${constants.KW.JEKI} i = 0; i < 10; ${constants.KW.JEKI} i = i + 1;) {
                ${constants.KW.SOPE} i;
                ${constants.KW.SE} (i == 5) {
                    ${constants.KW.KURO};
                }
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(6);
    });

});