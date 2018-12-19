const getFormattedReturnValue = require("../../../interpreters/helpers/helper_ise_adapter.js");

describe("Ka Test suite", () => {
    test("It should return the valid yorlang input - array", () => {
        expect(getFormattedReturnValue([])).toEqual([]);
    });

    test("It should return the valid yorlang input - string", () => {
        expect(getFormattedReturnValue("anu")).toBe("anu");
    });

    test("It should return the valid yorlang input - number", () => {
        expect(getFormattedReturnValue(3)).toBe(3);
    });

    test("It should return the valid yorlang input - boolean true", () => {
        expect(getFormattedReturnValue(true)).toBe("ooto");
    });

    test("It should return the valid yorlang input - boolean false", () => {
        expect(getFormattedReturnValue(false)).toBe("iro");
    });

    test("It should throw an error when given an input that can't be formatted to a yorlang input", () => {
        expect(() => getFormattedReturnValue({})).toThrow();
    });
});
