const KwNodeGbeWole = require("../../../parsers/keywordnodes/kwnodegbewole.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeGbeWole test suite", () => {
    let parser;

    beforeEach(() => {
        const code = `${constants.KW.GBE_WOLE} "./test.yl";`;
        parser = new Parser(new lexer(new InputStream(code)));
    });

    test("It should return valid gbewole node", () => {
        const expectedNode = {
            operation: constants.KW.GBE_WOLE,
            path: {
                left: null,
                operation: null,
                right: null,
                value: "./test.yl",
            }
        };

        expect(KwNodeGbeWole.getNode.call(parser))
            .toEqual(expectedNode);
    });

    test("It should fail when gbewole is given invalid parameter", () => { 
        parser.lexer().inputStream.code = `
            ${constants.KW.GBE_WOLE} "./test.yal";
        `;
        expect(() => KwNodeGbeWole.getNode.call(parser)).toThrow();
    });
});