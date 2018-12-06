const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const Environment = require(path.join(rootDir, "environment.js"));
const iNodeSope = require(path.join(rootDir, "interpreters/inodesope.js"));
const kwNodeSope = require(path.join(rootDir, "parsers/keyword-nodes/kwnodesope.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("INodeSope test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        global.console.log = jest.fn();
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should print a string to the console", () => {
        parser.lexer().inputStream.code = `${constants.KW.SOPE} "femi";`;
        const node = kwNodeSope.getNode.call(parser);
        iNodeSope.interpreteNode.call(mainInterpreter, node);
        expect(global.console.log).toHaveBeenCalledWith("femi");
    });

    test("it should print a number to the console", () => {
        parser.lexer().inputStream.code = `${constants.KW.SOPE} 3;`;
        const node = kwNodeSope.getNode.call(parser);
        iNodeSope.interpreteNode.call(mainInterpreter, node);
        expect(global.console.log).toHaveBeenCalledWith(3);
    });

    test("it should print the value of variable to the console", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = 5;
            ${constants.KW.SOPE} a;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(5);
    });

    test("it should print the value of an expression to the console", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.SOPE} "a" + 5;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("a5");
    });

    test("it should print the value of variable to the console", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = [1,5];
            ${constants.KW.SOPE} a[1];
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(5);
    });
});