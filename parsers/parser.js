const constants = require("../constants.js");
const kwnodes = require("./keywordnodes/kwnodes.js");
const nodeLiterals = require("./nodeLiterals/nodeliterals.js");
const helpers = require("./parser_helper_function.js");
const BaseNode = require("./basenode.js");

class Parser {

    constructor(lexer) {
        this.lexer = lexer;
        this.currentBlockType = [];
        this.initIsArithmeticExpression();
    }

    initIsArithmeticExpression() {
        //a work around for creating a private field with getters and setters
        var _isArithmeticExpression = true;
        this.setIsArithmeticExpression = (isArithmetic) => {
            _isArithmeticExpression = isArithmetic;
        }
        this.isArithmeticExpression = () => _isArithmeticExpression;
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

    //Recursive descent parsing technique
    //backtracking is used in handling operator precedence while parsing the expression
    parseExpression() {
       return this.parseAssign();
    }

    parseAssign() {
        return this.parseWhile([constants.SYM.ASSIGN], this.parseOr);
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

        if (this.isArithmeticExpression()) return this.parseWhile(operatorList, this.parsePlusMinus);
        else return this.parseWhile(operatorList, this.parseNodeLiteral); //it is a boolean expression
    }

    parsePlusMinus() {
        return this.parseWhile([constants.SYM.PLUS, constants.SYM.MINUS], this.parseMultiplyDivisionRemainder);
    }

    parseMultiplyDivisionRemainder() {
        return this.parseWhile([constants.SYM.MULTIPLY, constants.SYM.DIVIDE, constants.SYM.REMAINDER], this.parseNodeLiteral);
    }

    parseWhile(operatorList, parseOperatorWithLesserPrecedence) {
        let node = parseOperatorWithLesserPrecedence.bind(this)();

        while (this.lexer.isNotEndOfFile() && operatorList.indexOf(this.lexer.peek().value) >= 0) {
            node = {
                left : node,
                operation : this.lexer.next().value,
                right : parseOperatorWithLesserPrecedence.bind(this)(),
                value : null
            };
        }

        return node;
    }

    parseNodeLiteral() {
        const token = this.lexer.peek();

        if (nodeLiterals[token.type] != undefined) {
            const nodeliteral = nodeLiterals[token.type];
            if (nodeliteral instanceof BaseNode) return nodeliteral.getNode.call(this);
            else throw new Error(`${token.value} must be of type BaseNode`);
        }

        //check if the token value is a punctuation that can be used in an expression e.g (, [
        if (nodeLiterals[constants.EXP_PUNC][Symbol.for(token.value)] != undefined) { 
            const nodeliteral = nodeLiterals[constants.EXP_PUNC][Symbol.for(token.value)];
            if (nodeliteral instanceof BaseNode) return nodeliteral.getNode.call(this);
            else throw new Error(`${token.value} must be of type BaseNode`);
        }

        this.lexer.throwError(this.getGenericErrorMsg(token.type));
    }

    isNumStringVariable(token) {
        return token.type == constants.NUMBER || token.type == constants.STRING || token.type == constants.VARIABLE;
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
                ? this.lexer.next().value
                : this.lexer.throwError(this.getGenericErrorMsg(this.lexer.peek()));
    }

    parseDelimited(start, stop, separator, parser, predicate) {
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
        return `Cannot process unexpected token : ${value}`;
    }

    parseAst() {
        const token = this.lexer.peek();

        if (kwnodes[token.value] != undefined) {
            const kwNode = kwnodes[token.value];
            if (kwNode instanceof BaseNode) return kwNode.getNode.call(this); //call the method getNode in kwNode object like an extension function to the class Parser
            else throw new Error(`${kwNode} must be of type BaseNode`);
        }

        if (token.type == constants.VARIABLE) { //then a function call is expected
            let nodeliteral = nodeLiterals[constants.CALL_ISE];
            if (nodeliteral instanceof BaseNode) {
                nodeliteral = nodeliteral.getNode.call(this, this.lexer.next());
                this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
                return nodeliteral;
            } 
            
            throw new Error(`${nodeliteral} must be of type BaseNode`);
        }

        this.lexer.throwError(this.getGenericErrorMsg(token.value));
    }

    parseProgram() {
        const astList = [];

        this.currentBlockType.push(constants.PROGRAM);
        while (this.lexer.isNotEndOfFile()) {
            astList.push(this.parseAst());
        }
        this.currentBlockType.pop();

        return {type: constants.PROGRAM, astList: astList};
    }
}

const helpersList = Object.keys(helpers);
helpersList.forEach((helperName,index,array) => {
    Parser.prototype[helperName] = helpers[helperName];
});

module.exports = Parser;