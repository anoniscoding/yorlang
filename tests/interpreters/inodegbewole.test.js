const path = require('path');
const fs = require("fs");

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const Environment = require(path.join(rootDir, "environment.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const Lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("INodeGbeWole test suite", () => {

    beforeEach(() => {
        global.console.log = jest.fn();
    });

    test("it should import valid file path correctly", () => {
        fs.readFileSync.mockReturnValueOnce(`${constants.KW.GBE_WOLE} "/sample/sample.yl";   
                ${constants.KW.JEKI} b = isiro(14, 2);
                ${constants.KW.SOPE} b;         
            `).mockReturnValueOnce(`${constants.KW.ISE} isiro(a, b) { 
                ${constants.KW.PADA} a * b; 
            }`);
            
        const parser = new Parser(new Lexer(new InputStream()));
        const mainInterpreter = new MainInterpreter(new Environment(), parser);
        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(28);
    });

    test("it should fail to import invalid file path", () => {
        fs.readFileSync.mockReturnValueOnce(`${constants.KW.GBE_WOLE} "sample/sample.yl";   
                ${constants.KW.JEKI} b = isiro(14, 2);
                ${constants.KW.SOPE} b;         
            `);
            
        const parser = new Parser(new Lexer(new InputStream()));
        const mainInterpreter = new MainInterpreter(new Environment(), parser);
        
        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });
});