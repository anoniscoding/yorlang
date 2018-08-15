const constants = require("../constants.js");
const kwnodes = require("./kwnodes");

class Parser {

    constructor(lexer) {
        this.lexer = lexer;
        this.isArithmeticExpression = true;
        this.currentBlockType = [];
        this.punctuationValueTokens = {};
        this.nodeLiteralTypeTokens = {};
        this.init();
    }

    init() {
        this.punctuationValueTokens[constants.L_BRACKET_SYM_NAME] = this.parseBracketExpression.bind(this); //handle operator precedence with bracket
        this.punctuationValueTokens[constants.R_BRACKET_SYM_NAME] = this.parseArray.bind(this);
        this.nodeLiteralTypeTokens[constants.VARIABLE] = this.parseVariableLiteral.bind(this);
        this.nodeLiteralTypeTokens[constants.NUMBER] = this.parseLeaf.bind(this);
        this.nodeLiteralTypeTokens[constants.STRING] = this.parseLeaf.bind(this);
        this.nodeLiteralTypeTokens[constants.KEYWORD] = this.parseBool.bind(this);
    }

    isPunctuation(punc) {
        const token = this.lexer.peek();
        return token && token.type == constants.PUNCTUATION && (token.value == punc);
    }

    isOperator(op) {
        const token = this.lexer.peek();
        return token && token.type == constants.OPERATOR && (token.value == op);
    }

    isKeyword(kw) {
        const token = this.lexer.peek();
        return token && token.type == constants.KEYWORD && (token.value == kw);
    }

    skipPunctuation(punc) {
        if (this.isPunctuation(punc)) this.lexer.next();
        else this.lexer.throwError(this.getGenericErrorMsg(this.getCurrentTokenValue()));
    }

    skipOperator(op) {
        if (this.isOperator(op)) this.lexer.next();
        else this.lexer.throwError(this.getGenericErrorMsg(this.getCurrentTokenValue()));
    }

    skipKeyword(kw) {
        if (this.isKeyword(kw)) this.lexer.next();
        else this.lexer.throwError(this.getGenericErrorMsg(this.getCurrentTokenValue()));
    }

    getCurrentTokenValue() {
        return this.lexer.peek() ? this.lexer.peek().value : null;
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

        while (operatorList.indexOf(this.lexer.peek().value) >= 0) {
            node = {
                left : node,
                operation : this.lexer.next().value,
                right : parseOperationWithLesserPrecedence.bind(this)(),
                value : null
            };
        }

        return node;
    }

    parseNodeLiteral() {
        const token = this.lexer.peek();

        if (this.nodeLiteralTypeTokens[token.type] != undefined) {
            return this.nodeLiteralTypeTokens[token.type]();
        }

        //find the property name of the current token
        const constantsPropertyList = Object.keys(constants.SYM);
        const constantsPropertyValuesList = Object.values(constants.SYM);
        const index = constantsPropertyValuesList.indexOf(token.value);
        const punc_name = constantsPropertyList[index];

        //it will parse a punctuation token type that can be used in an expression e.g (, [
        if (this.punctuationValueTokens[punc_name] != undefined) {  
            return this.punctuationValueTokens[punc_name]();
        }

        this.lexer.throwError(this.getGenericErrorMsg(token.type));
    }

    parseBracketExpression(isArithmetic = true) {
        this.skipPunctuation(constants.SYM.L_BRACKET);
        this.isArithmeticExpression = isArithmetic;
        const node = this.parseExpression();
        this.isArithmeticExpression = true; //set back to default
        this.skipPunctuation(constants.SYM.R_BRACKET);

        return node;
    }

    parseArray(arrayNameToken) {
        const node = {};
        node.operation = constants.ARRAY;

        if (arrayNameToken == undefined) { //it is an array literal e.g [1,2,3]
            node.body = this.delimited( 
                constants.SYM.L_SQ_BRACKET , constants.SYM.R_SQ_BRACKET, constants.SYM.COMMA, 
                this.getTokenThatSatisfiesPredicate.bind(this), this.isNumStringVariable.bind(this)
            );
        } else { //it is an array element a[0]
            node.name = arrayNameToken.value;
            this.skipPunctuation(constants.SYM.L_SQ_BRACKET);
            node.index = this.lexer.next().value;
            this.skipPunctuation(constants.SYM.R_SQ_BRACKET);
        }

        return node;
    }

    isNumStringVariable(token) {
        return token.type == constants.NUMBER || token.type == constants.STRING || token.type == constants.VARIABLE;
    }

    parseVariableLiteral() {
        const currentToken = this.lexer.next();

        //if current variable is a function call
        if (this.lexer.peek().value == constants.SYM.L_BRACKET) {
            return this.parseCallIse(currentToken);
        }

        //if current variable is an array element
        if (this.lexer.peek().value == constants.SYM.L_SQ_BRACKET) {
            return this.parseArray(currentToken);
        }

        return {
            name: currentToken.value,
            operation: constants.GET_TI
        };
    }

    parseLeaf() {
        return {
            value: this.lexer.next().value,
            left: null,
            right: null,
            operation: null
        };
    }

    parseBool() {
        if ([constants.KW.OOTO, constants.KW.IRO].indexOf(this.lexer.peek().value) >= 0) {
            return this.parseLeaf();
        }
            
        this.lexer.throwError(`Expecting yorlang boolean(iró|òótó) but found ${token.value}`);
    }

    parseBlock(currentBlock) {
        this.currentBlockType.push(currentBlock);
        this.skipPunctuation(constants.SYM.L_PAREN);
        const block = []; 
        while (this.lexer.isNotEndOfFile() && this.lexer.peek().value != constants.SYM.R_PAREN) {
            block.push(this.parseAst());
        }
        this.skipPunctuation(constants.SYM.R_PAREN);
        this.currentBlockType.pop();

        return block;
    }

    parseVarname() {
        return  (this.lexer.peek().type == constants.VARIABLE) 
                ? { name: this.lexer.next().value }
                : this.lexer.throwError(`Expecting variable but found ${token}`);
    }

    parseCallIse(token) {
        return {
            operation: constants.CALL_ISE,
            name: token.value,
            args: this.delimited( 
                constants.SYM.L_BRACKET , constants.SYM.R_BRACKET, constants.SYM.COMMA, 
                this.getTokenThatSatisfiesPredicate.bind(this), this.isNumStringVariable.bind(this)
            )
        }; 
    }

    delimited(start, stop, separator, parser, predicate) {
        const varList = []; let firstVar = true;

        this.skipPunctuation(start);
        while(this.lexer.isNotEndOfFile()) {
            if (this.isPunctuation(stop)) break;
            if (firstVar) firstVar = false; else this.skipPunctuation(separator);
            if (this.isPunctuation(stop)) break; //this is necessary for an optional last separator
            varList.push(parser(predicate));
        }
        this.skipPunctuation(stop);

        return varList;
    }

    getTokenThatSatisfiesPredicate(predicate) {
        var token = this.lexer.next();
        if (predicate(token)) return token;

        this.lexer.throwError(this.getGenericErrorMsg(token.type));
    }

    getCurrentBlockType() {
        return this.currentBlockType[this.currentBlockType.length - 1];
    }

    isBlockType() {
        return this.currentBlockType.length > 0;
    }

    getGenericErrorMsg(value) {
        return `Cannot process unexpected token : ${value}`
    }

    parseAst() {
        const token = this.lexer.peek();

        if ((kwnodes[token.value] != undefined)) {
            try {
                const kwNode = kwnodes[token.value];
                return kwNode.setParser(this).getNode();
            } catch(err) {
                throw err;
            }
        }

        if (token.type == constants.VARIABLE) {
            const node = this.parseCallIse(this.lexer.next());
            this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
            return node;
        }

        this.lexer.throwError(this.getGenericErrorMsg(token.value));
    }

    parseProgram() {
        const astList = [];

        while (this.lexer.isNotEndOfFile()) {
            astList.push(this.parseAst());
        }

        return {type: constants.PROGRAM, astList: astList};
    }
}

module.exports = Parser;