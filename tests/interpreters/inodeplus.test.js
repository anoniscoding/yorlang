jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iPlus = require("../../interpreters/inodeplus.js");
const kwNodeTi = require("../../parsers/keyword-nodes/kwnodejeki.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("IPlus test suite", () => {

    test("it should interprete a plus operation", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 3 + 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iPlus.interpreteNode.call(new MainInterpreter(), node.right)).toBe(8);
    });
});