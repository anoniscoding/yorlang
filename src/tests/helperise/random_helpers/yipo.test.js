const yipo = require("../../../helperise/random_helpers/yipo.js");

describe("Yipo Test suite", () => {
    test("It should return a random number between 0 and 1", () => {
        for (let i = 1; i <= 5; i++) {
            expect(yipo([])).toBeGreaterThan(0)
            expect(yipo([])).toBeLessThan(1)
        }
    });

    test("It should return a random number between 1 and 2", () => {
        for (let i = 1; i <= 5; i++) {
            expect(yipo([1, 2])).toBeGreaterThan(1)
            expect(yipo([1, 2])).toBeLessThan(2)
        }
    });

    test("It should return a random number between 0 and 7", () => {
        for (let i = 1; i <= 5; i++) {
            expect(yipo([7])).toBeGreaterThan(0)
            expect(yipo([7])).toBeLessThan(7)
        }
    });
});
