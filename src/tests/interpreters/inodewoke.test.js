jest.mock("fs", () => ({
    readFileSync: jest.fn(),
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
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should set global(woke) variables properly within local context", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} count() {
                ${constants.KW.JEKI} counter = 3;
                ${constants.KW.JEKI} i = 15;  
                ${constants.KW.JEKI} j = [6,7];  
            
                ${constants.KW.ISE} incrementCounter() { 
                    ${constants.KW.WOKE} \`counter, j\`;

                    ${constants.KW.JEKI} counter = counter + 1;
                    ${constants.KW.JEKI} i = i + 1;
                    ${constants.KW.JEKI} j[0] = j[0] + 8;
                    ${constants.KW.SOPE} i;
                }
                incrementCounter();

                ${constants.KW.SOPE} j[0];
                ${constants.KW.SOPE} i;
                ${constants.KW.PADA} counter;
            
            }
            
            ${constants.KW.SOPE} count();
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(16);
        expect(global.console.log).toHaveBeenCalledWith(14);
        expect(global.console.log).toHaveBeenCalledWith(15);
        expect(global.console.log).toHaveBeenCalledWith(4);
    });

    test("it should set global(woke) variables properly within local context - second example", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} count() {
                ${constants.KW.JEKI} i = 15;  
            
                ${constants.KW.ISE} incrementCounter() {
                    ${constants.KW.WOKE} \`i\`;
                    ${constants.KW.JEKI} i = i + 1;
                    
                    ${constants.KW.ISE} increase() { 
                        ${constants.KW.WOKE} \`i\`;
    
                        ${constants.KW.JEKI} i = i + 2;
                    }
                    increase();
                }
                
                incrementCounter();

                ${constants.KW.SOPE} i;
            }
            
            count();
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(18);
    });
});
