const aago = require("../../../helperise/datetime_helpers/aago.js");

describe("Aago Test suite", () => {
    test("It should return current date", () => {
        const date = new Date();
        const aagoList = aago([]);
        expect(aagoList[0]).toBe(date.getFullYear());
        expect(aagoList[1]).toBe(date.getMonth() + 1)
        expect(aagoList[2]).toBe(date.getDate()) 
        expect(aagoList[3]).toBe(date.getHours())
        expect(aagoList[4]).toBe(date.getMinutes()) 
        expect(aagoList[5]).toBe(date.getSeconds())
    });
});
