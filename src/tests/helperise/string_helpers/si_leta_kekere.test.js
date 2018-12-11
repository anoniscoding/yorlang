const siLetaKekere = require("../../../helperise/string_helpers/si_leta_kekere.js");

describe("SiLetaNla Test suite", () => {
    test("It should return lowercase version of string", () => {
        const array = ["ANU", ];
        expect(siLetaKekere(array)).toBe("anu");
    });

    test("It should fail to convert invalid string to lowercase", () => {
        const array = [1, ];
        expect(() => siLetaKekere(array)).toThrow();
    });

    test("It should fail because helper function siLetaKekere expects an array as argument", () => {
        const array = 2;
        expect(() => siLetaKekere(array)).toThrow("Yorlang system error");
    });
});
