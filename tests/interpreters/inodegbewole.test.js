const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeGbeWole test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment());
        global.console.log = jest.fn();
    });

    test("it should import valid file path correctly", () => {
        //file paths should be provided as a suffix to the project's absolute path
        parser.lexer().inputStream.code = `${constants.KW.GBE_WOLE} "/sample/sample.yl";   
            ${constants.KW.TI} b = isiro(14, 2);
            ${constants.KW.SOPE} b;         
        `;

        mainInterpreter.interpreteProgram(parser);
        expect(global.console.log).toHaveBeenCalledWith(28);
    });

    test("it should fail to import invalid file path", () => {
        parser.lexer().inputStream.code = `${constants.KW.GBE_WOLE} "../../asdfk.yl";
        `;

        expect(() => mainInterpreter.interpreteProgram(parser)).toThrow();
    });
});