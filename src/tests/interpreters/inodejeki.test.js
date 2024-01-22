jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeTi = require("../../interpreters/inodejeki.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodejeki.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

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
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toEqual([1, 2, ]);
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
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toEqual(["funmi", 2, ]);
    });

    test("it should assign value to the last position of an array element with empty index", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = [1,2];
            ${constants.KW.JEKI} a[] = "funmi";
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toEqual([1, 2, "funmi", ]);
    });

    test("it should assign value to the last position of a multidimensional array element with empty index", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = [1,[2]];
            ${constants.KW.JEKI} a[1][] = "funmi";
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toEqual([1, [2, "funmi", ], ]);
    });

    test("it should assign value to a multi-dimensional array element", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} a = [[1,2], [[3,4], 5]];
            ${constants.KW.JEKI} a[1][0][0] = "funmi";
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toEqual([ [1, 2, ], [["funmi", 4, ], 5, ], ]);
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
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toEqual([[1, 2, ], "funmi", 5, ]);
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
            ${constants.KW.JEKI} a = síLẹ́tàKékeré("FUNMI");
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "a")).toBe("funmi");
    });

    test("it should test integration of helper fiRopo", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} text = fiRopo("Yoruba da pupo", "pupo", "gidigan");

        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "text")).toBe("Yoruba da gidigan");
    });

    test("it should test integration of helper waNinu", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} text = waNinu("Yoruba da pupo", "pupo");

        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "text")).toBe("ooto");
    });

    test("it should test integration of helper aago", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} time = aago();
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "time")).toBeTruthy();
    });

    test("it should retrieve array element with value 0 (falsy but valid)", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} arr = [0, 1, 2];
            ${constants.KW.JEKI} result = arr[0];
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "result")).toBe(0);
    });

    test("it should retrieve array element with value false (falsy but valid)", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} arr = [${constants.KW.IRO}, ${constants.KW.OOTO}];
            ${constants.KW.JEKI} result = arr[0];
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "result")).toBe(constants.KW.IRO);
    });

    test("it should retrieve array element with empty string (falsy but valid)", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} arr = ["", "hello"];
            ${constants.KW.JEKI} result = arr[0];
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "result")).toBe("");
    });

    test("it should retrieve multidimensional array element with falsy values", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} arr = [[0, ${constants.KW.IRO}], ["", 1]];
            ${constants.KW.JEKI} result1 = arr[0][0];
            ${constants.KW.JEKI} result2 = arr[0][1];
            ${constants.KW.JEKI} result3 = arr[1][0];
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "result1")).toBe(0);
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "result2")).toBe(constants.KW.IRO);
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "result3")).toBe("");
    });

    test("it should still throw error for truly undefined array index", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} arr = [1, 2, 3];
            ${constants.KW.JEKI} result = arr[10];
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });
});
