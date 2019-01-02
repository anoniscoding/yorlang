const oTobiJulo = require("../../../helperise/max_min_helpers/o_tobi_julo.js");

describe("OtobiJulo Test suite", () => {
    test("It should return maximum numnber in the array", () => {
        const array = [34,44,455,54, ];
        expect(oTobiJulo(array)).toBe(455);
    });

    test("It should return maximum numnber in the array", () => {
        const array = ['34','44','455','54', ];
        expect(() => oTobiJulo(array)).toBe(455);
    });

    test("It should fail because helper function oTobiJulo accepts only an array of numbers as argument", () => {
        const array = ['34','44','455','54','fsfghfsf', ];
        expect(() => oTobiJulo(array)).toThrow("element of array must be a number");
    });
});
