jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const kwNodeWoke = require("../../../parsers/keywordnodes/kwnodewoke.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeWoke test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("It should return a valid woke node found within an ise block", () => {
        parser.lexer().inputStream.code = `${constants.KW.WOKE} \`counter, name\`;`;

        const expectedNode = {
            operation: constants.KW.WOKE,
            varNames: ["counter", "name"]
        };
        parser.pushToBlockTypeStack(constants.KW.ISE);

        expect(kwNodeWoke.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should fail to return a valid woke node found outside ise block", () => {
        parser.lexer().inputStream.code = `${constants.KW.WOKE} \`counter\`;`;
        parser.pushToBlockTypeStack(constants.PROGRAM);

        expect(() => kwNodeWoke.getNode.call(parser)).toThrow();
    });

    test("It should fail to return a valid woke node when woke is not used with a variable", () => {
        parser.lexer().inputStream.code = `${constants.KW.WOKE} \`"something"\`;`;
        parser.pushToBlockTypeStack(constants.PROGRAM);

        expect(() => kwNodeWoke.getNode.call(parser)).toThrow();
    });
});