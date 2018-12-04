jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iMinus = require("../../interpreters/inodeminus.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodeti.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("IMinus test suite", () => {

    test("it should interprete a minus operation", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer().inputStream.code = `${constants.KW.TI} a = 5 - 4;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iMinus.interpreteNode.call(new MainInterpreter(), node.right)).toBe(1);
    });
});