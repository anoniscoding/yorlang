const waNinu = require("../../../helperise/string_helpers/wa_ni_nu.js");

describe("waNinu Test Suite", () => {
    test("It should return the boolean if the parent string contains the substring", ()=> {
        const oruko = "Yoruba da pupo";
        expect(waNinu([oruko, "pupo"])).toBe(true);
    });

    test("It should fail because helper function waNinu takes only 2 strings", ()=> {
        expect(()=> waNinu(["yoruba da pupo", 47])).toThrow();
    });

    test("It should fail because helper function waNinu expects an array as argument", () => {
        expect(() => waNinu(1)).toThrow("Yorlang system error");
    });

});
