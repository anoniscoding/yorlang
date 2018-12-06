const constants = require("./constants.js");
const fs = require("fs");

class InputStream {

    constructor(fileName) {
        this.code = this.readProgramFile(fileName);
        this.line = 1;
        this.column = 0;
        this.position = 0;
        this.yorlangFileName = () => fileName;
    }

    readProgramFile(fileName) {
        try {
            return fs.readFileSync(process.cwd() +"/"+ fileName, 'utf8'); 
        } catch (e) {
            throw new Error(`Could not read file: ${fileName}`);
        }
    }

    //return the next value and also discard it from the stream
    next() {
        const character = this.code.charAt(this.position++);
        
        if (character === constants.SYM.NEW_LINE) {
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
        throw new Error(`There's an error at line ${this.line} near column ${this.column} in file ${this.yorlangFileName()} :\n ${msg}`);
    }

    isEndOfFile() {
        return this.peek() == "";
    }

    isNotEndOfFile() {
        return this.peek() != "";
    }
}

module.exports = InputStream;