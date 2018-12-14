const getFormattedInput = require("../../../interpreters/helpers/helper_ise_adapter.js");

describe("Ka Test suite", () => {
    test("It should return the valid yorlang input - array", () => {
        expect(getFormattedInput([])).toEqual([]);
    });

    test("It should return the valid yorlang input - string", () => {
        expect(getFormattedInput("anu")).toBe("anu");
    });

    test("It should return the valid yorlang input - number", () => {
        expect(getFormattedInput(3)).toBe(3);
    });

    test("It should return the valid yorlang input - boolean true", () => {
        expect(getFormattedInput(true)).toBe("ooto");
    });

    test("It should return the valid yorlang input - boolean false", () => {
        expect(getFormattedInput(false)).toBe("iro");
    });

    test("It should throw an array when given an input that can't be formatted to yorlang input", () => {
        expect(() => getFormattedInput({})).toThrow();
    });
});
