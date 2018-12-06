const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const Environment = require(path.join(rootDir, "environment.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("INodeCallIse test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should call an already declared ise function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} fname;
            }

            teOruko("femi");
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("femi");
    });

    test("it should fail to print a variable that is out of scope", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} fname;
            }

            teOruko("femi");
            ${constants.KW.SOPE} fname;
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });

    test("it should have access to variables in a parent scope", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} sname = "karounwi";

            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} sname +" "+ fname;
            }

            teOruko("femi");
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("karounwi femi");
    });

    test("it should fail to call an ise function that hasn't been declared", () => {
        parser.lexer().inputStream.code = `
            teOruko("femi");
        `;

        expect(() => mainInterpreter.interpreteProgram(parser)).toThrow();
    });

    test("it should maintain scope within nested ise node", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} sname = "karounwi";

            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} sname +" "+ fname;

                ${constants.KW.ISE} tePhoneNoPeluOruko(no) {
                    ${constants.KW.SOPE} sname +" "+ fname +" "+no;
                }
                tePhoneNoPeluOruko("0812035532");
            }

            teOruko("femi");
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("karounwi femi");
        expect(global.console.log).toHaveBeenCalledWith("karounwi femi 0812035532");

    });

    test("it should call an ise function in a parent scope", () => {
        parser.lexer().inputStream.code = `
        ${constants.KW.JEKI} sname = "karounwi";

            ${constants.KW.ISE} tePhoneNoPeluOruko(no) {
                ${constants.KW.SOPE} no;
            }

            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} sname +" "+ fname;

                tePhoneNoPeluOruko("0812035532");
            }

            teOruko("femi");
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("karounwi femi");
        expect(global.console.log).toHaveBeenCalledWith("0812035532");
    });

    test("it should return a value from an se block within an ise function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} gbaOruko(fname) {
                ${constants.KW.JEKI} b = [1,2,3];
                ${constants.KW.JEKI} c = 4;

                ${constants.KW.SE} (c > b[0]) {
                    ${constants.KW.PADA} b[0] +" "+ fname;
                } ${constants.KW.TABI} {
                    ${constants.KW.PADA} "a o ni fun e loruko";
                }
            }

            ${constants.KW.JEKI} a = gbaOruko("femi");
            ${constants.KW.SOPE} a;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("1 femi");
    });

    test("it should return a value from a nigbati block within an ise function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} gbaOnka() {
                ${constants.KW.JEKI} b = [1,2,3];
                ${constants.KW.JEKI} c = 4;

                ${constants.KW.NIGBATI} (c < 6) {
                    ${constants.KW.PADA} c;
                }
            }

            ${constants.KW.JEKI} a = gbaOnka();
            ${constants.KW.SOPE} a;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(4);
    });

    test("it should return a value from a fun block within an ise function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} gbaOnka() {
                ${constants.KW.JEKI} b = [1,2,3];
                ${constants.KW.JEKI} c = 4;

                ${constants.KW.FUN} (${constants.KW.JEKI} i = 0; i < 10; ${constants.KW.JEKI} i = i + 1;) {
                    ${constants.KW.PADA} i;
                }
            }

            ${constants.KW.JEKI} a = gbaOnka();
            ${constants.KW.SOPE} a;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(0);
    });
});