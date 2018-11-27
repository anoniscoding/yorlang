jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeWoke test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        global.console.log = jest.fn();
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment());
    });

    test("it should set global(woke) variables properly within local context", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} count() {
                ${constants.KW.TI} counter = 3;
                ${constants.KW.TI} i = 15;  
                ${constants.KW.TI} j = [6,7];  
            
                ${constants.KW.ISE} incrementCounter() { 
                    ${constants.KW.WOKE} \`counter, j\`;

                    ${constants.KW.TI} counter = counter + 1;
                    ${constants.KW.TI} i = i + 1;
                    ${constants.KW.TI} j[0] = j[0] + 8;
                    ${constants.KW.SOPE} i;
                }
                incrementCounter();

                ${constants.KW.SOPE} j[0];
                ${constants.KW.SOPE} i;
                ${constants.KW.PADA} counter;
            
            }
            
            ${constants.KW.SOPE} count();
        `;

        mainInterpreter.interpreteProgram(parser)
        expect(global.console.log).toHaveBeenCalledWith(16);
        expect(global.console.log).toHaveBeenCalledWith(14);
        expect(global.console.log).toHaveBeenCalledWith(15);
        expect(global.console.log).toHaveBeenCalledWith(4);
    });
});