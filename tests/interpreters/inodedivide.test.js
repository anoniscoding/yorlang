jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iDivide = require("../../interpreters/inodedivide.js");
const kwNodeTi = require("../../parsers/keyword-nodes/kwnodejeki.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("IDivide test suite", () => {

    test("it should interprete a division operation", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 15 / 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iDivide.interpreteNode.call(new MainInterpreter(), node.right)).toBe(3);
    });

    test("it should fail to divide when being divided by zero", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 15 / 0;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(() => iDivide.interpreteNode.call(new MainInterpreter(), node.right)).toThrow();
    });
});