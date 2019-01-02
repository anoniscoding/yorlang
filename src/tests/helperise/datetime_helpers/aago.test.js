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

    test("It should return year, month and day", () => {
        const date = new Date(2017, 11, 30);
        const aagoList = aago([2017, 11, 30]);
        expect(aagoList[0]).toBe(date.getFullYear());
        expect(aagoList[1]).toBe(date.getMonth())
        expect(aagoList[2]).toBe(date.getDate()) 
        expect(aagoList[3]).toBe(date.getHours())
        expect(aagoList[4]).toBe(date.getMinutes()) 
        expect(aagoList[5]).toBe(date.getSeconds())
    });

    test("It should return hour, minutes, seconds, and milliseconds", () => {
        const date = new Date(2017, 11, 30, 9, 15, 15, 150);
        const aagoList = aago([2017, 11, 30, 9, 15, 15, 150]);
        expect(aagoList[0]).toBe(date.getFullYear());
        expect(aagoList[1]).toBe(date.getMonth())
        expect(aagoList[2]).toBe(date.getDate()) 
        expect(aagoList[3]).toBe(date.getHours())
        expect(aagoList[4]).toBe(date.getMinutes()) 
        expect(aagoList[5]).toBe(date.getSeconds())
        expect(aagoList[6]).toBe(date.getMilliseconds())
    });

    test("It should fail to return date because the yorlang system fails to pass it an array as parameter", () => {
        expect(() => aago()).toThrow();
    });

    describe('Array as First Argument', () => {
        test("It should return current date", () => {
            const date = new Date();
            const aagoList = aago([[]]);
            expect(aagoList[0]).toBe(date.getFullYear());
            expect(aagoList[1]).toBe(date.getMonth() + 1)
            expect(aagoList[2]).toBe(date.getDate()) 
            expect(aagoList[3]).toBe(date.getHours())
            expect(aagoList[4]).toBe(date.getMinutes()) 
            expect(aagoList[5]).toBe(date.getSeconds())
        });

        test("It should return year, month and day", () => {
            const date = new Date(2017, 11, 30);
            const aagoList = aago([[2017, 11, 30]]);
            expect(aagoList[0]).toBe(date.getFullYear());
            expect(aagoList[1]).toBe(date.getMonth())
            expect(aagoList[2]).toBe(date.getDate()) 
            expect(aagoList[3]).toBe(date.getHours())
            expect(aagoList[4]).toBe(date.getMinutes()) 
            expect(aagoList[5]).toBe(date.getSeconds())
        });

        test("It should return hour, minutes, seconds, and milliseconds", () => {
            const date = new Date(2017, 11, 30, 9, 15, 15, 150);
            const aagoList = aago([[2017, 11, 30, 9, 15, 15, 150]]);
            expect(aagoList[0]).toBe(date.getFullYear());
            expect(aagoList[1]).toBe(date.getMonth())
            expect(aagoList[2]).toBe(date.getDate()) 
            expect(aagoList[3]).toBe(date.getHours())
            expect(aagoList[4]).toBe(date.getMinutes()) 
            expect(aagoList[5]).toBe(date.getSeconds())
            expect(aagoList[6]).toBe(date.getMilliseconds())
        });
    })
});
