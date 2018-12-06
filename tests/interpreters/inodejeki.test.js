const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const Environment = require(path.join(rootDir, "environment.js"));
const iNodeTi = require(path.join(rootDir, "interpreters/inodejeki.js"));
const kwNodeTi = require(path.join(rootDir, "parsers/keyword-nodes/kwnodejeki.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("INodeJeki test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should assign expression to a variable", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = ((5 + 2) * (2 - 4)) / 2;`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toBe(-7);
    });

    test("it should assign floating point number to a variable", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = 3.142;`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toBe(3.142);
    });

    test("it should assign string to a variable", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = "anu";`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toBe("anu");
    });

    test("it should assign an array literal to a variable", () => {
        parser.lexer().inputStream.code = `${constants.KW.JEKI} a = [1,2];`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toEqual([1,2]);
    });

    test("it should interprete expression that contains a variable reference", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 5;
            ${constants.KW.JEKI} b = ((a + 2) * (2 - 4)) / 2;
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "b")).toBe(-7);
    });

    test("it should assign value to an array element", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = [1,2];
            ${constants.KW.JEKI} a[0] = "funmi";
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toEqual(["funmi",2]);
    });

    test("it should assign value to a multi-dimensional array element", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = [[1,2], [[3,4], 5]];
            ${constants.KW.JEKI} a[1][0][0] = "funmi";
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toEqual([ [1,2], [["funmi",4],5] ]);
    });

    test("it should fail to assign value to an invalid multi-dimensional array element", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = [[1,2], [[3,4], 5]];
            ${constants.KW.JEKI} a[1][0][0][0] = "funmi";
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });

    test("it should fail to assign undefined to variable", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} fname;
            }
            
            ${constants.KW.JEKI} a = teOruko("name");
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });

    test("it should assign value to a multi-dimensional array element", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = [[1,2], [3,4], 5];
            ${constants.KW.JEKI} a[1] = "funmi";
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toEqual([[1,2], "funmi", 5]);
    });

    test("it should assign transformed (uppercase) string to variablet", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = síLẹ́tàŃlá("funmi");
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toBe("FUNMI");
    });

    test("it should assign transformed (lowercase) string to variable", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = síLẹ́tàkékeré("FUNMI");
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toBe("funmi");
    });
});