const constants = require("./constants.js");

class Lexer {

    constructor(inputStream) {
        this.inputStream = inputStream;
        this.currentToken = null;
    }

    isWhiteSpace(ws) {
        return constants.LIST.WHITESPACES.indexOf(ws) >= 0;
    }

    isPunctuation(punc) {
        return constants.LIST.PUNCTUATIONS.indexOf(punc) >= 0;
    }

    isIdentifier(id) {
        return constants.REGEX.IDENTIFIER.test(id);
    }

    isOperator(op) {
        return constants.LIST.OPERATORS.indexOf(op) >= 0;
    }

    isKeyword(kw) {
        return constants.LIST.KEYWORDS.indexOf(kw) >= 0;
    }

    isDigit(dig) {
       return constants.REGEX.DIGIT.test(dig);
    }

    readWhile(predicate) {
        let str = "";

        while (this.inputStream.isNotEndOfFile() && predicate(this.inputStream.peek())) {
            str += this.inputStream.next();
        }

        return str;
    }

    readString() {
        const stringEnd = constants.SYM.STR_QUOTE;
        this.inputStream.next(); //needed to skip the opening quote symbol '"'
        const str = this.readWhile((ch) => {
            return (ch == stringEnd) ? false : true;
        });

        if (this.inputStream.peek() == stringEnd)
            this.inputStream.next(); //needed to skip the closing quote symbol '"'
        else 
            this.throwError(`Expecting '${stringEnd}' but found unexpected char`);

        return { type: constants.STRING, value: str };
    }

    readIdentifier() {
        const identifier = this.readWhile(this.isIdentifier);
        
        return {
            type: this.isKeyword(identifier)  ? constants.KEYWORD : constants.VARIABLE,
            value: this.getNonAccentedIdentifier(identifier)
        };
    }

    getNonAccentedIdentifier(identifier) {
        return identifier.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
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
            return ch != constants.SYM.NEW_LINE;
        });
        this.inputStream.next(); //skips the "\n" symbol
    }

    readNext() {
        this.readWhile(this.isWhiteSpace);
        if (this.inputStream.isEndOfFile()) return null;

        const ch = this.inputStream.peek();
        if (ch == constants.SYM.COMMENT) {
            this.skipComments();
            return this.readNext();
        }
        if (ch == constants.SYM.STR_QUOTE) return this.readString();
        if (this.isDigit(ch)) return this.readNumber();
        if (this.isIdentifier(ch)) return this.readIdentifier();
        if (this.isPunctuation(ch)) return { type: constants.PUNCTUATION, value: this.inputStream.next() }
        if (this.isOperator(ch)) return { type: constants.OPERATOR, value: this.readWhile(this.isOperator) }

        this.throwError(`Cant handle character  '${ch}'`);
    }

    peek() {
        return this.current || (this.current = this.readNext());
    }

    //The next function dosent always call readNext()
    //because it might have been peeked before 
    //(in which case readNext() was already called and the inputstream has advanced)
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
        this.inputStream.throwError(msg);
    }
}

module.exports = Lexer;