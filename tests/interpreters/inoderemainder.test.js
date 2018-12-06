const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const iRemainder = require(path.join(rootDir, "interpreters/inoderemainder.js"));
const kwNodeTi = require(path.join(rootDir, "parsers/keyword-nodes/kwnodejeki.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const Lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("IRemainder test suite", () => {

    test("it should interprete a remainder operation", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 15 % 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iRemainder.interpreteNode.call(new MainInterpreter(), node.right)).toBe(0);
    });
});