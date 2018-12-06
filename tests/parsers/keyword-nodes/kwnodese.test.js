const path = require('path');

const kwNodeSe = require(path.join(rootDir, "parsers/keyword-nodes/kwnodese.js"));
const Parser = require(path.join(rootDir, "parsers/parser.js"));
const lexer = require(path.join(rootDir, "lexer.js"));
const InputStream = require(path.join(rootDir, "inputStream.js"));
const constants = require(path.join(rootDir, "constants.js"));

describe("KwNodeSe test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("it should return a valid se node", () => {
        parser.lexer().inputStream.code = `${constants.KW.SE} (niOruko) {
            ${constants.KW.SOPE} "o ni oruko";
        }`;

        const expectedNode = {
            condition: {
                name: "niOruko", 
                operation: constants.GET_JEKI
            }, 
            operation: constants.KW.SE, 
            then: [
                {
                    body: {
                        left: null, 
                        operation: null, 
                        right: null, 
                        value: "o ni oruko"
                    }, 
                    operation: constants.KW.SOPE
                }
            ]
        };

        expect(kwNodeSe.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return a valid se node when body is empty", () => {
        parser.lexer().inputStream.code = `${constants.KW.SE} (niOruko) {}`;

        const expectedNode = {
            condition: {
                name: "niOruko", 
                operation: constants.GET_JEKI
            }, 
            operation: constants.KW.SE, 
            then: []
        };

        expect(kwNodeSe.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return a valid se node for nested blocks", () => {
        parser.lexer().inputStream.code = `${constants.KW.SE} (niOruko) {
            ${constants.KW.SE} (niOruko) {}
        }`;

        expect(kwNodeSe.getNode.call(parser)).toBeTruthy();
    });

    test("it should return a valid se and tabi node", () => {
        parser.lexer().inputStream.code = `${constants.KW.SE} (aropo && ${constants.KW.OOTO}) {} ${constants.KW.TABI} {}`;

        const expectedNode = {
            condition: {
                left: {
                    name: "aropo", 
                    operation: constants.GET_JEKI
                }, 
                operation: constants.SYM.AND, 
                right: {
                    left: null, 
                    operation: null, 
                    right: null,
                    value: constants.KW.OOTO
                }, 
                value: null
            }, 
            else: [], 
            operation: constants.KW.SE, 
            then: []
        };

        expect(kwNodeSe.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should throw an error when given an invalid se and tabi node", () => {
        parser.lexer().inputStream.code = `${constants.KW.SE} aropo && ${constants.KW.OOTO}) {} tàbí {}`;

        expect(() => {
            kwNodeSe.getNode.call(parser);
        }).toThrow();
    });

    test("it should parse tabi se (else if) statements", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.SE} (aropo && ${constants.KW.OOTO}) {} 
            ${constants.KW.TABI} ${constants.KW.SE} (niOruko) {}
            ${constants.KW.TABI} ${constants.KW.SE} (${constants.KW.OOTO}) {}
            ${constants.KW.TABI} {}
        `;

        const expectedNode = {
            "condition": {
                "left": {
                    "name": "aropo",
                    "operation": constants.GET_JEKI
                },
                "operation": "&&",
                "right": {
                    "left": null,
                    "operation": null,
                    "right": null,
                    "value": constants.KW.OOTO
                },
                "value": null
            },
            "else": {
                "condition": {
                    "name": "niOruko",
                    "operation": constants.GET_JEKI
                },
                "else": {
                    "condition": {
                        "left": null,
                        "operation": null,
                        "right": null,
                        "value": constants.KW.OOTO
                    },
                    "else": [],
                    "operation": constants.KW.SE,
                    "then": []
                },
                "operation": constants.KW.SE,
                "then": []
            },
            "operation": constants.KW.SE,
            "then": []
        };

        expect(kwNodeSe.getNode.call(parser)).toEqual(expectedNode);
    });

});