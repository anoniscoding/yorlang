const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const iNodeGetJeki = require(path.join(rootDir, "interpreters/inodegetjeki.js"));
const Environment = require(path.join(rootDir, "environment.js"));
const iNodeTi = require(path.join(rootDir, "interpreters/inodejeki.js"));
const kwNodeTi = require(path.join(rootDir, "parsers/keyword-nodes/kwnodejeki.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const Lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("INodegetJeki test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should get the value of a variable if it exists", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 15 / 5;`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(iNodeGetJeki.interpreteNode.call(mainInterpreter, {name: "a"})).toBe(3);
    });

    test("it should throw an error when attempting to get the value of a non-existent variable within the current scope", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 15 / 5;`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(() => iNodeGetJeki.interpreteNode.call(mainInterpreter, {name: "b"})).toThrow();
    });
});