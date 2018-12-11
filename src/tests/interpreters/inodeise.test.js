jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeIse test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("It should save an ise node", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} fname;
            }
        `;

        const expectedNode = {
            body: [{
                operation: constants.KW.SOPE,
                body: {
                    name: "fname",
                    operation: constants.GET_JEKI,
                },
            }, ],
            name: "teOruko",
            operation: constants.KW.ISE,
            paramTokens: [
                {
                    type: constants.VARIABLE,
                    value: "fname",
                },
            ],
        };

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getIse(mainInterpreter.getCurrentScope(), "teOruko")).toEqual(expectedNode);
    });

    test("It should fail to save ise node if there exist another ise node with the same name in the same scope", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} teOruko(fname, lname) {
                ${constants.KW.SOPE} fname + " "+ lname;
            }

            ${constants.KW.ISE} teOruko(fname) {
                ${constants.KW.SOPE} fname + " "+ lname;
            }
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });

    test("It should save nested ise node", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ISE} teName(fname, lname) {
                ${constants.KW.SOPE} fname + " "+ lname;
                ${constants.KW.ISE} teNumber(number) {
                    ${constants.KW.SOPE} number;
                }
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getIse(mainInterpreter.getCurrentScope(), "teName")).toBeTruthy();
    });
});
