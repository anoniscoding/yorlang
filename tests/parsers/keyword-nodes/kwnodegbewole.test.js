const path = require('path');

const KwNodeGbeWole = require(path.join(rootDir, "parsers/keyword-nodes/kwnodegbewole.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));
const fs = require("fs");

describe("KwNodeGbeWole test suite", () => {
    let parser;

    beforeEach(() => {
        fs.readFileSync.mockReturnValue(`${constants.KW.GBE_WOLE} "./test.yl";`);
        parser = new Parser(new lexer(new InputStream()));
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