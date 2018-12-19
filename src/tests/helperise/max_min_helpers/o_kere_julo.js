const oKereJulo = require("../../../helperise/max_min_helpers/o_kere_julo.js");

describe("OkereJulo Test suite", () => {
    test("It should return minimum numnber in the array", () => {
        const array = [34,44,455,54, ];
        expect(oKereJulo(array)).toBe(34);
    });

    test("It should return minimum numnber in the array", () => {
        const array = ['34','44','455','54', ];
        expect(() => oKereJulo(array)).toBe(34);
    });

    test("It should fail because helper function OkereJulo accepts only an array of numbers as argument", () => {
        const array = ['34','44','455','54','fsfghfsf' ];
        expect(() => oKereJulo(array)).toThrow("element of array must be a number");
    });
});
