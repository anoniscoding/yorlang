const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const iMinus = require(path.join(rootDir, "interpreters/inodeminus.js"));
const kwNodeTi = require(path.join(rootDir, "parsers/keyword-nodes/kwnodejeki.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const Lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("IMinus test suite", () => {

    test("it should interprete a minus operation", () => {
        let parser = new Parser(new Lexer(new InputStream()));
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 5 - 4;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iMinus.interpreteNode.call(new MainInterpreter(), node.right)).toBe(1);
    });
});