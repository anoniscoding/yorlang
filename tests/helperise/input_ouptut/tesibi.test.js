const path = require('path');

const readlineSync = require('readline-sync');
const teSibi = require(path.join(rootDir, "helperise/input_output/tesibi.js"));

describe("TeSibi Test suite", () => {

    test("It should read user input", () => {
        readlineSync.question.mockReturnValueOnce("anu");

        const array = ["What is your name?"];
        expect(teSibi(array)).toBe("anu");
    });

    test("It should fail to read user input", () => {
        const array = [1];
        expect(() => teSibi(array)).toThrow();
    });

    test("It should fail because helper function teSibi expects an array as argument", () => {
        const array = 2;
        expect(() => teSibi(array)).toThrow("Yorlang system error");
    });
});