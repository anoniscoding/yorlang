jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iNodePada = require("../../interpreters/inodepada.js");
const kwNodePada = require("../../parsers/keywordnodes/kwnodepada.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

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

        expect(iNodePada.interpreteNode.call(new MainInterpreter(), node)).toEqual([1, 2, ]);
    });
});
