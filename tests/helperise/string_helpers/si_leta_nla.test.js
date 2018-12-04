const siLetaNla = require("../../../helperise/string_helpers/si_leta_nla.js");

describe("SiLetaNla Test suite", () => {

    test("It should return uppercase version of string", () => {
        const array = ["anu"];
        expect(siLetaNla(array)).toBe("ANU");
    });

    test("It should fail to convert invalid string to upper case", () => {
        const array = [1];
        expect(() => siLetaNla(array)).toThrow();
    });

    test("It should fail because helper function siLetaNla expects an array as argument", () => {
        const array = 2;
        expect(() => siLetaNla(array)).toThrow("Yorlang system error");
    });
});