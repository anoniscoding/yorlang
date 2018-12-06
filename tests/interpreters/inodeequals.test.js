const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const Environment = require(path.join(rootDir, "environment.js"));
const iNodeEquals = require(path.join(rootDir, "interpreters/inodeequals.js"));
const kwNodeTi = require(path.join(rootDir, "parsers/keyword-nodes/kwnodejeki.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const Lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("INodeEquals test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should return ooto for an equal true condition", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 5 == 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeEquals.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.OOTO);
    });

    test("it should return iro for an equal false condition", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 5 == 4;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeEquals.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.IRO);
    });

    test("it should get the value of a variable and test it in an equal condition", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = ${constants.KW.OOTO};
            ${constants.KW.JEKI} b = a == ${constants.KW.OOTO};
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "b")).toEqual(constants.KW.OOTO);
    });
});