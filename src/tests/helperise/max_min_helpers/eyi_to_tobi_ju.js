const oTobiJulo = require("../../../helperise/max_min_helpers/eyi_to_tobi_ju.js");

describe("eyiToTobiJu Test suite", () => {
    test("It should return maximum numnber in the array", () => {
        const array = [34,44,455,54, ];
        expect(eyiToTobiJu(array)).toBe(455);
    });

    test("It should return maximum numnber in the array", () => {
        const array = ['34','44','455','54', ];
        expect(() => eyiToTobiJu(array)).toBe(455);
    });

    test("It should fail because helper function oTobiJulo accepts only an array of numbers as argument", () => {
        const array = ['34','44','455','54','fsfghfsf', ];
        expect(() => eyiToTobiJu(array)).toThrow("element of array must be a number");
    });

    test("It should ignore other arguments and return maximum number in the array which is the first argument", () => {
        const array = [[34,44,455],54,'fsfghfsf' ];
        expect(() => eyiToTobiJu(array)).toBe(455);
    });

    test("It should fail because helper function eyiToTobiJu expects an array as argument", () => {
        const array = 8;
        expect(() => eyiToTobiJu(array)).toThrow("Yorlang system error");
    });
});
