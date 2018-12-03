jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");
const fs = require("fs");

describe("INodeGbeWole test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        mainInterpreter = new MainInterpreter(new Environment());
        global.console.log = jest.fn();
    });

    test("it should import valid file path correctly", () => {
        fs.readFileSync.mockReturnValueOnce(`${constants.KW.GBE_WOLE} "/sample/sample.yl";   
                ${constants.KW.TI} b = isiro(14, 2);
                ${constants.KW.SOPE} b;         
            `).mockReturnValueOnce(`iṣẹ́ isiro(a, b) { 
                padà a * b; 
            }`);
            
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter.interpreteProgram(parser);
        expect(global.console.log).toHaveBeenCalledWith(28);
    });

    test("it should fail to import invalid file path", () => {
        fs.readFileSync.mockReturnValueOnce(`${constants.KW.GBE_WOLE} "sample/sample.yl";   
                ${constants.KW.TI} b = isiro(14, 2);
                ${constants.KW.SOPE} b;         
            `);
            
        parser = new Parser(new Lexer(new InputStream()));

        expect(() => mainInterpreter.interpreteProgram(parser)).toThrow();
    });
});