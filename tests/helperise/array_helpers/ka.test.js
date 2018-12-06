const path = require('path');

const ka = require(path.join(rootDir, "helperise/array_helpers/ka.js"));

describe("Ka Test suite", () => {

    test("It should return the length of the array", () => {
        const array = [[1,2,3]];
        expect(ka(array)).toBe(3);
    });

    test("It should fail because ka expects a multidimensional array", () => {
        const array = [1,2,3];
        expect(() => ka(array)).toThrow();
    });

    test("It should fail because ka expects an array as argument", () => {
        const array = 2;
        expect(() => ka(array)).toThrow("Yorlang system error");
    });
});