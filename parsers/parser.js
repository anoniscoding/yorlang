const constants = require("../constants.js");
const kwnodes = require("./kwnodes");
const InputStream = require("../inputstream.js");
const Lexer = require("../lexer.js");

class Parser {

    constructor(tokenInput) {
        this.tokenInput = tokenInput;
        this.isArithmeticExpression = true;
        this.currentBlockType = [];
    }

    isPunctuation(punc) {
        const token = this.tokenInput.peek();
        return token && token.type == constants.PUNCTUATION && (token.value == punc);
    }

    isOperator(op) {
        const token = this.tokenInput.peek();
        return token && token.type == constants.OPERATOR && (token.value == op);
    }

    isKeyword(kw) {
        const token = this.tokenInput.peek();
        return token && token.type == constants.KEYWORD && (token.value == kw);
    }

    skipPunctuation(punc) {
        if (this.isPunctuation(punc)) this.tokenInput.next();
        else this.tokenInput.throwError(`Cannot process unexpected token: ${this.getCurrentTokenValue()}`);
    }

    skipOperator(op) {
        if (this.isOperator(op)) this.tokenInput.next();
        else this.tokenInput.throwError(`Cannot process unexpected token: ${this.getCurrentTokenValue()}`);
    }

    skipKeyword(kw) {
        if (this.isKeyword(kw)) this.tokenInput.next();
        else this.tokenInput.throwError(`Cannot process unexpected token: ${this.getCurrentTokenValue()}`);
    }

    getCurrentTokenValue() {
        return this.tokenInput.peek() ? this.tokenInput.peek().value : null;
    }

    //backtracking is used in handling operator precedence while parsing the expression
    parseExpression() {
       return this.parseOr();
    }

    parseOr() {
        return this.parseWhile([constants.SYM.OR], this.parseAnd);
    }

    parseAnd() {
        return this.parseWhile([constants.SYM.AND], this.parseGreaterLesserEquality);
    }

    parseGreaterLesserEquality() {
        const operatorList = [
            constants.SYM.L_THAN, constants.SYM.G_THAN, constants.SYM.G_THAN_OR_EQ,  
            constants.SYM.L_THAN_OR_EQ, constants.SYM.EQ, constants.SYM.NOT_EQ
        ];

        if (this.isArithmeticExpression)
            return this.parseWhile(operatorList, this.parsePlusMinus);
        else
            return this.parseWhile(operatorList, this.parseNodeLiteral); //it is a boolean expression
    }

    parsePlusMinus() {
        return this.parseWhile([constants.SYM.PLUS, constants.SYM.MINUS], this.parseMultiplyDivisionRemainder);
    }

    parseMultiplyDivisionRemainder() {
        return this.parseWhile([constants.SYM.MULTIPLY, constants.SYM.DIVIDE, constants.SYM.REMAINDER], this.parseNodeLiteral);
    }

    parseWhile(operatorList, parseOperationWithLesserPrecedence) {
        let node = parseOperationWithLesserPrecedence.bind(this)();

        while (operatorList.indexOf(this.tokenInput.peek().value) >= 0) {
            node = {
                left : node,
                operation : this.tokenInput.next().value,
                right : parseOperationWithLesserPrecedence.bind(this)(),
                value : null
            };
        }

        return node;
    }

    parseNodeLiteral() {
        const token = this.tokenInput.peek();

        //handles operator precedence with bracket
        if (token.value == constants.SYM.L_BRACKET) {
            return this.parseBracketExpression(true);
        }
        
        if (token.type == constants.VARIABLE) {
            return this.parseVariableLiteral();
        }

        if ([constants.NUMBER, constants.STRING].indexOf(token.type) >= 0) {
            return this.parseLeaf();
        }

        if (token.type == constants.KEYWORD) {
            return this.parseBool();
        }

        this.tokenInput.throwError(`Cannot process unexpected token: ${token.type}`);
    }

    parseBracketExpression(isArithmetic) {
        this.skipPunctuation(constants.SYM.L_BRACKET);
        this.isArithmeticExpression = isArithmetic;
        const node = this.parseExpression();
        this.isArithmeticExpression = true; //set back to default
        this.skipPunctuation(constants.SYM.R_BRACKET);

        return node;
    }

    parseVariableLiteral() {
        const current = this.tokenInput.next();

        //if current variable is a function call
        if (this.tokenInput.peek().value == constants.SYM.L_BRACKET) {
            return this.parseCallIse(current);
        }

        return {
            name: current.value,
            operation: constants.GET_TI
        };
    }

    parseLeaf() {
        return {
            value: this.tokenInput.next().value,
            left: null,
            right: null,
            operation: null
        };
    }

    parseBool() {
        if ([constants.KW.OOTO, constants.KW.IRO].indexOf(this.tokenInput.peek().value) >= 0) {
            return this.parseLeaf();
        }
            
        this.tokenInput.throwError(`Expecting yorlang boolean(iró|òótó) but found ${token.value}`);
    }

    parseBlock(currentBlock) {
        this.currentBlockType.push(currentBlock);
        this.skipPunctuation(constants.SYM.L_PAREN);
        const block = []; 
        while (this.tokenInput.isNotEndOfFile() && this.tokenInput.peek().value != constants.SYM.R_PAREN) {
            block.push(this.parseAst());
        }
        this.skipPunctuation(constants.SYM.R_PAREN);
        this.currentBlockType.pop();

        return block;
    }

    parseVarname() {
        return  (this.tokenInput.peek().type == constants.VARIABLE) 
                ? { name: this.tokenInput.next().value }
                : this.tokenInput.throwError(`Expecting variable but found ${token}`);
    }

    parseCallIse(token) {
        if (this.isPunctuation("(")) {
            const node = {
                operation: constants.CALL_ISE,
                name: token.value,
                args: this.delimited( 
                    constants.SYM.L_BRACKET , constants.SYM.R_BRACKET, constants.SYM.COMMA, 
                    this.parseIseVarsOrValues.bind(this), (token) => {
                    return token.type == constants.NUMBER || token.type == constants.STRING || token.type == constants.VARIABLE
                })
            }; 
            return node;
        }
        
        this.tokenInput.throwError(`Expecting yorlang function call but found ${this.tokenInput.peek().type}`);
    }

    delimited(start, stop, separator, parser, predicate) {
        const varList = []; let firstVar = true;

        this.skipPunctuation(start);
        while(this.tokenInput.isNotEndOfFile()) {
            if (this.isPunctuation(stop)) break;
            if (firstVar) firstVar = false; else this.skipPunctuation(separator);
            if (this.isPunctuation(stop)) break; //this is necessary for an optional last separator
            varList.push(parser(predicate));
        }
        this.skipPunctuation(stop);

        return varList;
    }

    parseIseVarsOrValues(predicate) {
        var token = this.tokenInput.next();
        if (predicate(token)) return token.value;

        this.tokenInput.throwError(`Cannot process unexpected token: ${token.type}`);
    }

    getCurrentBlockType() {
        return this.currentBlockType[this.currentBlockType.length - 1];
    }

    isBlockType() {
        return this.currentBlockType.length > 0;
    }

    parseAst() {
        const token = this.tokenInput.peek();

        if ((kwnodes[token.value] != undefined)) {
            const kwNode = kwnodes[token.value];
            return kwNode.setParser(this).getNode();
        }

        if (token.type == constants.VARIABLE) {
            const node = this.parseCallIse(this.tokenInput.next());
            this.skipPunctuation(constants.STATEMENT_TERMINATOR);
            return node;
        }

        this.tokenInput.throwError(`Cannot process unexpected token : ${token.value}`);
    }

    parseProgram() {
        const astList = [];

        while (this.tokenInput.isNotEndOfFile()) {
            astList.push(this.parseAst());
        }

        return {type: constants.PROGRAM, astList: astList};
    }
}

var code = `
#Sample program to be interpreted

tí akoko = 7.51;
tí ikeji = 2;
tí aropo = akoko / 3 + ikeji * 2;
sopé aropo;

tí niOruko = òótó;

sé (akoko > aropo && òótó) {
    sopé "omowe";
} tàbí {
    sopé "olodo"; 
}

sé (niOruko) {
    sopé "o ni oruko";
}

sé (niOruko) {}

tí oruko = "";

isé koOruko(orukoMi) {
    tí oruko = orukoMi;
    
    fún (tí i =0; i < 10; tí i = i + 1;) {
        sopé i;
    }

    isé teAkori() {
        sopé "adupe";
    }

    nígbàtí ((ikeji < aropo) && (ikeji > 0)) {
        sopé "a jura wa lo tijakadi ko";
        tí ikeji = ikeji + 1;
    }

    teAkori();
}

isé teOruko() {
    sopé oruko;
}

fún (tí i =45; ((i < 200) && (i > 0)); tí i = i + i;) {
    sopé i;
}

isé seIsiro(a, b) {
    tí a = a * 2;
    tí c = a + b;
    padà c;
}

koOruko("anu");
teOruko();
tí d = seIsiro(1,2);

tí c = (15 /3) + (3 * 2);

nígbàtí (ikeji < aropo) {
    sopé "ikeji kere si aropo";
    tí ikeji = ikeji + 1;
    
    sé (ikeji > c) {
        kúrò;
    }
}
`

const ast = new Parser(new Lexer(new InputStream(code))).parseProgram()

console.log(ast.astList[0])

module.exports = Parser;