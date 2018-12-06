const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const iNodeArray = require(path.join(rootDir, "interpreters/inodearray.js"));
const Environment = require(path.join(rootDir, "environment.js"));
const kwNodeTi = require(path.join(rootDir, "parsers/keyword-nodes/kwnodejeki.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("INodeArray test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should return an array literal", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = [1,2,b];`;
        const node = kwNodeTi.getNode.call(parser);
        expect(() => iNodeArray.interpreteNode.call(mainInterpreter, node.right)).toThrow();
    });

    test("it should return an empty array literal", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = [];`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeArray.interpreteNode.call(mainInterpreter, node.right)).toEqual([]);
    });

    test("it should interprete expression that contains a variable reference", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 5;
            ${constants.KW.JEKI} b = [1,2,a];
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "b")).toEqual([1,2,5]);
    });

    test("it should interprete expression that contains an array element reference", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = [3,2];
            ${constants.KW.JEKI} b = [1,2,a[0]];
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "b")).toEqual([1,2,3]);
    });

    test("it should interprete a multidimensional array", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = [3,4];
            ${constants.KW.JEKI} b = [[1,2], [3,a[1]]];
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "b")).toEqual([[1,2],[3,4]]);
    });

    test("it should interprete a multidimensional array element", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = [3,4];
            ${constants.KW.JEKI} b = [[1,2], [3,a[1]]];
            ${constants.KW.SOPE} b[1][1];
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(4);
    });

    test("it should fail when trying to access an invalid multidimensional array element", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = [3,4];
            ${constants.KW.JEKI} b = [[1,2], [3,a[1]]];
            ${constants.KW.SOPE} b[1][1][0];
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });
});