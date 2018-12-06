const path = require('path');

const MainInterpreter = require(path.join(rootDir, "interpreters/maininterpreter.js"));
const iNodePada = require(path.join(rootDir, "interpreters/inodepada.js"));
const kwNodePada = require(path.join(rootDir, "parsers/keyword-nodes/kwnodepada.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("INodePada test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("pada should return a number value", () => {
        parser.lexer().inputStream.code = `${constants.KW.PADA} 2;`;
        parser.pushToBlockTypeStack(constants.KW.ISE);
        const node = kwNodePada.getNode.call(parser);

        expect(iNodePada.interpreteNode.call(new MainInterpreter(), node)).toBe(2);
    });

    test("pada should return a string value", () => {
        parser.lexer().inputStream.code = `${constants.KW.PADA} "anu";`;
        parser.pushToBlockTypeStack(constants.KW.ISE);
        const node = kwNodePada.getNode.call(parser);

        expect(iNodePada.interpreteNode.call(new MainInterpreter(), node)).toBe("anu");
    });

    test("pada should return a floating point value", () => {
        parser.lexer().inputStream.code = `${constants.KW.PADA} 3.142;`;
        parser.pushToBlockTypeStack(constants.KW.ISE);
        const node = kwNodePada.getNode.call(parser);

        expect(iNodePada.interpreteNode.call(new MainInterpreter(), node)).toBe(3.142);
    });

    test("pada should return an array literal value", () => {
        parser.lexer().inputStream.code = `${constants.KW.PADA} [1,2];`;
        parser.pushToBlockTypeStack(constants.KW.ISE);
        const node = kwNodePada.getNode.call(parser);

        expect(iNodePada.interpreteNode.call(new MainInterpreter(), node)).toEqual([1,2]);
    });
});