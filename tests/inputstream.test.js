const InputStream = require("../inputstream.js");
const constants = require("../constants.js");

describe("InputStream Tests", () => {
    let inputStream;
    const code = `tí a = 3; tí b = 4;
                  sopé a;`;

    beforeEach(() => {
        inputStream = new InputStream(code);
    });

    test("Peek - It should peek at the next character without discarding it from the stream", () => {
        expect(inputStream.peek()).toBe("t");
        expect(inputStream.next()).toBe("t");
    });

    test("Next - It should read in the next character and discard it from the stream", () => {
        expect(inputStream.next()).toBe("t");
        expect(inputStream.peek()).toBe("í");
    });

    test("ThrowError - It should throw an error message", () => {
        while (inputStream.peek() != constants.NEW_LINE) {
            inputStream.next();
        }

        inputStream.next(); //read in the new line character
        expect(() => {
            inputStream.throwError("Testing error msg");
        }).toThrow(`There's an error at line 2 near column 0.\nTesting error msg`);
    });

    test("isNotEndOfFile - It should confirm that the inputstream has not read in the last char in the file", () => {
        expect(inputStream.isNotEndOfFile()).toBe(true)
    })

    test("isEndOfFile - It should confirm that the inputstream has read in the last char in the file", () => {
        while (inputStream.isNotEndOfFile()) {
            inputStream.next();
        }

        expect(inputStream.isEndOfFile()).toBe(true);
    })

});