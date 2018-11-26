const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeGthan = require("../../interpreters/inodegthan.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodeti.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeGreaterThan test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment());
    });

    test("it should return ooto for a greater than true condition", () => {
        parser.lexer().inputStream.code = `${constants.KW.TI} a = 5 > 4;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeGthan.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.OOTO);
    });

    test("it should return iro for a greater than false condition", () => {
        parser.lexer().inputStream.code = `${constants.KW.TI} a = 5 > 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeGthan.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.IRO);
    });

    test("it should return iro for a greater than false condition involving a string", () => {
        parser.lexer().inputStream.code = `${constants.KW.TI} a = "anu" > 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeGthan.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.IRO);
    });

    test("it should get the value of a variable and test it in a greater than condition", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.TI} a = 6;
            ${constants.KW.TI} b = a > 5;
        `;

        mainInterpreter.interpreteProgram(parser);
        expect(mainInterpreter.environment().getTi(mainInterpreter.getCurrentScope(), "b")).toEqual(constants.KW.OOTO);
    });
});