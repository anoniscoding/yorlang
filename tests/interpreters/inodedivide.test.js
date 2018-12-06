const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const iDivide = require(path.join(rootDir, "interpreters/inodedivide.js"));
const kwNodeTi = require(path.join(rootDir, "parsers/keyword-nodes/kwnodejeki.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const Lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

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