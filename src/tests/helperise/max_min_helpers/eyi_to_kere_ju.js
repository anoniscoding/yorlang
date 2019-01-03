const oKereJulo = require("../../../helperise/max_min_helpers/eyi_to_kere_ju.js");

describe("eyiToKereJu Test suite", () => {
    test("It should return minimum numnber in the array", () => {
        const array = [34,44,455,54, ];
        expect(eyiToKereJu(array)).toBe(34);
    });

    test("It should return minimum numnber in the array", () => {
        const array = ['34','44','455','54', ];
        expect(() => eyiToKereJu(array)).toBe(34);
    });

    test("It should fail because helper function OkereJulo accepts only an array of numbers as argument", () => {
        const array = ['34','44','455','54','fsfghfsf' ];
        expect(() => eyiToKereJu(array)).toThrow("element of array must be a number");
    });

    test("It should ignore other arguments and return minimum number in the array which is the first argument", () => {
        const array = [[34,44,455],54,'fsfghfsf' ];
        expect(() => eyiToKereJu(array)).toBe(34);
    });

    test("It should fail because helper function eyiToKereJu expects an array as argument", () => {
        const array = 8;
        expect(() => eyiToKereJu(array)).toThrow("Yorlang system error");
    });
});
