const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const Environment = require(path.join(rootDir, "environment.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("INodeSe test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should interprete the se keyword and run the then block ", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 7;
            ${constants.KW.SE} (a > 6) {
                ${constants.KW.JEKI} a = 6 * 3;
                ${constants.KW.SOPE} a;
            } ${constants.KW.TABI} {
                ${constants.KW.JEKI} a = 6 * 2;
                ${constants.KW.SOPE} a;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(18);
    });

    test("it should run the then block when the condition returns a truthy value that is not the keyword OOTO", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 7;
            ${constants.KW.SE} (a) {
                ${constants.KW.SOPE} a;
            } 
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(7);
    });

    test("it should interprete the se keyword and run the else block ", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 6;
            ${constants.KW.SE} (a > 6) {
                ${constants.KW.JEKI} a = 6 * 3;
                ${constants.KW.SOPE} a;
            } ${constants.KW.TABI} {
                ${constants.KW.JEKI} a = 6 * 2;
                ${constants.KW.SOPE} a;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(12);
    });

    test("it should interprete nested se keyword and run the then block ", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 7;
            ${constants.KW.SE} (a > 6) {
                ${constants.KW.JEKI} a = 6 * 3;
                ${constants.KW.SOPE} a;

                ${constants.KW.SE} (a > 14) {
                    ${constants.KW.JEKI} a = 6 * 5;
                    ${constants.KW.SOPE} a;
                }
            } ${constants.KW.TABI} {
                ${constants.KW.JEKI} a = 6 * 2;
                ${constants.KW.SOPE} a;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(18);
        expect(global.console.log).toHaveBeenCalledWith(30);
    });

    test("it should interprete tabi se (else if) statments ", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 5;

            ${constants.KW.SE} (a < 5) {
                ${constants.KW.SOPE} a + 4;
            } 
            ${constants.KW.TABI} ${constants.KW.SE} (a > 7) {
                ${constants.KW.SOPE} a + 3;
            }
            ${constants.KW.TABI} ${constants.KW.SE} (a == 5) {
                ${constants.KW.SOPE} a + 2;
            }
            ${constants.KW.TABI} {
                ${constants.KW.SOPE} a + 1;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(7);
    });
    
});