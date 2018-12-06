const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const Environment = require(path.join(rootDir, "environment.js"));
const iNodeLthan = require(path.join(rootDir, "interpreters/inodelthan.js"));
const kwNodeTi = require(path.join(rootDir, "parsers/keyword-nodes/kwnodejeki.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const Lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("INodeLessThan test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should return ooto for a lesser than true condition", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 4 < 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeLthan.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.OOTO);
    });

    test("it should return iro for a lesser than false condition", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 5 < 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeLthan.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.IRO);
    });

    test("it should get the value of a variable and test it in a lesser than condition", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 6;
            ${constants.KW.JEKI} b = a < 7;
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "b")).toEqual(constants.KW.OOTO);
    });
});