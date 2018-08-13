const constants = require("./constants.js");

class Lexer {

    constructor(inputStream) {
        this.input = inputStream;
        this.keywords = [
            constants.KW.TI, constants.KW.NIGBATI, constants.KW.SE, constants.KW.SOPE, 
            constants.KW.TABI, constants.KW.OOTO, constants.KW.IRO, constants.KW.ISE, 
            constants.KW.FUN, constants.KW.PADA, constants.KW.KURO
        ];
        this.currentToken = null;
    }

    isWhiteSpace(ws) {
        return " \t\n".indexOf(ws) >= 0;
    }

    isPunctuation(punc) {
        return "(){};,".indexOf(punc) >= 0;
    }

    isIdentifier(id) {
        return /[a-z]|í|é|ò|ó|à|ú/i.test(id);
    }

    isOperator(op) {
        return "+-*/%<>=!|&".indexOf(op) >= 0;
    }

    isKeyword(kw) {
        return this.keywords.indexOf(kw) >= 0;
    }

    isDigit(dig) {
       return /[0-9]/i.test(dig);
    }

    readWhile(predicate) {
        let str = "";

        while (this.input.isNotEndOfFile() && predicate(this.input.peek())) {
            str += this.input.next();
        }

        return str;
    }

    readString() {
        const stringEnd = constants.SYM.STR_QUOTE;
        this.input.next(); //needed to skip the opening quote symbol '"'
        const str = this.readWhile((ch) => {
            return (ch == stringEnd) ? false : true;
        });

        this.input.next(); //needed to skip the closing quote symbol '"'
        return { type: constants.STRING, value: str };
    }

    readIdentifier() {
        const identifier = this.readWhile(this.isIdentifier);
        
        return {
            type: this.isKeyword(identifier)  ? constants.KEYWORD : constants.VARIABLE,
            value: identifier
        };
    }

    readNumber() {
        let hasDot = false;
        const num = this.readWhile((ch) => {
            if (ch == constants.SYM.PERIOD) {
                if(hasDot) return false;
                hasDot = true;
                return true;
            }
            return this.isDigit(ch)
        });

        return { type: constants.NUMBER, value: parseFloat(num) };
    }

    skipComments() {
        this.readWhile((ch) => {
            return ch != constants.NEW_LINE;
        });
        this.input.next(); //skips the "\n" symbol
    }

    readNext() {
        this.readWhile(this.isWhiteSpace);
        if (this.input.isEndOfFile()) return null;

        const ch = this.input.peek();
        if (ch == constants.SYM.COMMENT) {
            this.skipComments();
            return this.readNext();
        }
        if (ch == constants.SYM.STR_QUOTE) return this.readString();
        if (this.isDigit(ch)) return this.readNumber();
        if (this.isIdentifier(ch)) return this.readIdentifier();
        if (this.isPunctuation(ch)) return { type: constants.PUNCTUATION, value: this.input.next() }
        if (this.isOperator(ch)) return { type: constants.OPERATOR, value: this.readWhile(this.isOperator) }

        this.input.throwError(`Cant handle character  '${ch}'`);
    }

    peek() {
        return this.current || (this.current = this.readNext());
    }

    //The next function dosent always call readNext()
    //because it might have been peeked before 
    //(in which case readNext() was already called and the stream advanced)
    next() {
        const token = this.current;
        this.current = null;
        return token || this.readNext();
    }

    isEndOfFile() {
        return this.peek() == null;
    }

    isNotEndOfFile() {
        return this.peek() != null;
    }

    throwError(msg) {
        this.input.throwError(msg);
    }
}

module.exports = Lexer;