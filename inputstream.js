const constants = require("./constants.js");

class InputStream {

    constructor(inputCode) {
        this.code = inputCode;
        this.line = 1;
        this.column = 0;
        this.position = 0;
    }

    //return the next value and also discard it from the stream
    next() {
        const character = this.code.charAt(this.position++);
        
        if (character === constants.NEW_LINE) {
            this.column = 0; this.line++;
        } else {
            this.column++;
        }

        return character;
    }

    //return the next value without discarding it from the stream
    peek() {
        return this.code.charAt(this.position);
    }

    throwError(msg) {
        throw new Error(`There's an error at line ${this.line} near column ${this.column}.\n${msg}`);
    }

    isEndOfFile() {
        return this.peek() == "";
    }

    isNotEndOfFile() {
        return this.peek() != "";
    }
}

module.exports = InputStream;