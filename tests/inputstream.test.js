jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

const InputStream = require("../inputStream.js");
const constants = require("../constants.js");

describe("InputStream Tests", () => {
    let inputStream;

    beforeEach(() => {
        inputStream = new InputStream();
    });

    test("Peek - It should peek at the next character without discarding it from the stream", () => {
        inputStream.code = "tí";
        expect(inputStream.peek()).toBe("t");
        expect(inputStream.next()).toBe("t");
    });

    test("Next - It should read in the next character and discard it from the stream", () => {
        inputStream.code = "tí";

        expect(inputStream.next()).toBe("t");
        expect(inputStream.peek()).toBe("í");
    });

    test("ThrowError - It should throw an error message while specifying the location of the error accurately", () => {
        inputStream.code = `${constants.SYM.NEW_LINE}`;
        inputStream.next(); //read in the new line character
        const errorMsg = "Testing error msg";

        expect(() => {
            inputStream.throwError(errorMsg);
        }).toThrow();
    });

    test("isNotEndOfFile - It should confirm that the inputstream has not read in the last char in the file", () => {
        inputStream.code = "tí";

        expect(inputStream.isNotEndOfFile()).toBe(true);
    });

    test("isEndOfFile - It should confirm that the inputstream has read in the last char in the file", () => {
        inputStream.code = "";

        expect(inputStream.isEndOfFile()).toBe(true);
    });

});