const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeCallIse test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment());
        global.console.log = jest.fn();
    });

    test("it should call an already declared ise function", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} fname;
            }

            teOruko("femi");
        `;

        const program = parser.parseProgram();
        mainInterpreter.astList = program.astList;
        mainInterpreter.evaluateAst();

        expect(global.console.log).toHaveBeenCalledWith("femi");
    });

    test("it should fail to print a variable that is out of scope", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} fname;
            }

            teOruko("femi");
            ${constants.KW.SOPE} fname;
        `;

        const program = parser.parseProgram();
        mainInterpreter.astList = program.astList;
        ;

        expect(() => mainInterpreter.evaluateAst()).toThrow();
    });

    test("it should have access to variables in a parent scope", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} sname = "karounwi";

            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} sname +" "+ fname;
            }

            teOruko("femi");
        `;

        const program = parser.parseProgram();
        mainInterpreter.astList = program.astList;
        mainInterpreter.evaluateAst();

        expect(global.console.log).toHaveBeenCalledWith("karounwi femi");
    });

    test("it should fail to call an ise function that hasn't been declared", () => {
        parser.lexer.inputStream.code = `
            teOruko("femi");
        `;

        const program = parser.parseProgram();
        mainInterpreter.astList = program.astList;
        ;

        expect(() => mainInterpreter.evaluateAst()).toThrow();
    });

    test("it should maintain scope within nested ise node", () => {
        parser.lexer.inputStream.code = `
            ${constants.KW.TI} sname = "karounwi";

            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} sname +" "+ fname;

                ${constants.KW.ISE} tePhoneNoPeluOruko(no) {
                    ${constants.KW.SOPE} sname +" "+ fname +" "+no;
                }
                tePhoneNoPeluOruko("0812035532");
            }

            teOruko("femi");
        `;

        const program = parser.parseProgram();
        mainInterpreter.astList = program.astList;
        mainInterpreter.evaluateAst();

        expect(global.console.log).toHaveBeenCalledWith("karounwi femi");
        expect(global.console.log).toHaveBeenCalledWith("karounwi femi 0812035532");

    });

    test("it should call an ise function in a parent scope", () => {
        parser.lexer.inputStream.code = `
        ${constants.KW.TI} sname = "karounwi";

            ${constants.KW.ISE} tePhoneNoPeluOruko(no) {
                ${constants.KW.SOPE} no;
            }

            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} sname +" "+ fname;

                tePhoneNoPeluOruko("0812035532");
            }

            teOruko("femi");
        `;

        const program = parser.parseProgram();
        mainInterpreter.astList = program.astList;
        mainInterpreter.evaluateAst();

        expect(global.console.log).toHaveBeenCalledWith("karounwi femi");
        expect(global.console.log).toHaveBeenCalledWith("0812035532");
    });
});