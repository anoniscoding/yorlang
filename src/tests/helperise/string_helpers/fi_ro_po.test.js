const fiRopo = require("../../../helperise/string_helpers/fi_ro_po.js");

describe("fiRopo Test Suite", () => {
    test("It should return a new string", ()=> {
        const oruko = "Yoruba da pupo";
        expect(fiRopo([oruko, "pupo", "gidi gan"])).toBe("Yoruba da gidi gan");
    });

    test("It should fail because helper function takes only 3 strings", ()=> {
        expect(()=> fiRopo(["yoruba da pupo", 47, 56])).toThrow();
    });

    test("It should fail because helper function waNinu expects an array as argument", () => {
        expect(() => fiRopo(1)).toThrow("Yorlang system error");
    });

});
