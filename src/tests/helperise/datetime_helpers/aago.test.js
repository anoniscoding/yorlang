const aago = require("../../../helperise/datetime_helpers/aago.js");

describe("Aago Test suite", () => {
    test("It should return current date", () => {
        const d = new Date();
        const aagoArr = aago();
        expect(aagoArr[0]).toBe(d.getFullYear());
        expect(aagoArr[1]).toBe(d.getMonth() + 1)
        expect(aagoArr[2]).toBe(d.getDate()) 
        expect(aagoArr[3]).toBe(d.getHours())
        expect(aagoArr[4]).toBe(d.getMinutes()) 
        expect(aagoArr[5]).toBe(d.getSeconds())
    });

    test("It should return year, month and day", () => {
        const d = new Date(2017, 11, 30);
        const aagoArr = aago([2017, 11, 30]);
        expect(aagoArr[0]).toBe(d.getFullYear());
        expect(aagoArr[1]).toBe(d.getMonth() + 1)
        expect(aagoArr[2]).toBe(d.getDate()) 
        expect(aagoArr[3]).toBe(d.getHours())
        expect(aagoArr[4]).toBe(d.getMinutes()) 
        expect(aagoArr[5]).toBe(d.getSeconds())
    });

    test("It should return hour, minutes, seconds, and milliseconds", () => {
        const d = new Date(2017, 11, 30, 9, 15, 15, 150);
        const aagoArr = aago([2017, 11, 30, 9, 15, 15, 150]);
        expect(aagoArr[0]).toBe(d.getFullYear());
        expect(aagoArr[1]).toBe(d.getMonth() + 1)
        expect(aagoArr[2]).toBe(d.getDate()) 
        expect(aagoArr[3]).toBe(d.getHours())
        expect(aagoArr[4]).toBe(d.getMinutes()) 
        expect(aagoArr[5]).toBe(d.getSeconds())
        expect(aagoArr[6]).toBe(d.getMilliseconds())
    });
});
