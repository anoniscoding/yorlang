const constants = require("../constants.js");
const kwnodes = require("./keywordnodes/kwnodes.js");
const nodeLiterals = require("./nodeLiterals/nodeliterals.js");
const BaseNode = require("./basenode.js");

class Parser {

    constructor(lexer, yorlangFileName) {
        this.lexer = () => lexer;
        this.yorlangFileName = () => yorlangFileName;
        this.initBlockTypeStack();
        this.initIsArithmeticExpression();
    }

    initBlockTypeStack() {
        //a work around for creating a private field with public accessors
        var _blockTypeStack = [];
        this.pushToBlockTypeStack = (blockName) => {
            _blockTypeStack.push(blockName);
        }
        this.popBlockTypeStack = () => _blockTypeStack.pop();
        this.peekBlockTypeStack = () => _blockTypeStack[_blockTypeStack.length - 1];
        this.getBlockTypeStack = () => [..._blockTypeStack];
    }

    initIsArithmeticExpression() {
        var _isArithmeticExpression = true;
        this.setIsArithmeticExpression = (isArithmetic) => {
            _isArithmeticExpression = isArithmetic;
        }
        this.isArithmeticExpression = () => _isArithmeticExpression;
    }

    isNextTokenPunctuation(punc) {
        const token = this.lexer().peek();
        return token && token.type == constants.PUNCTUATION && (token.value == punc);
    }

    isNextTokenOperator(op) {
        const token = this.lexer().peek();
        return token && token.type == constants.OPERATOR && (token.value == op);
    }

    isNextTokenKeyword(kw) {
        const token = this.lexer().peek();
        return token && token.type == constants.KEYWORD && (token.value == kw);
    }

    skipPunctuation(punc) {
        if (this.isNextTokenPunctuation(punc)) this.lexer().next();
        else this.throwError(this.getGenericErrorMsg(this.getCurrentTokenValue()));
    }

    skipOperator(op) {
        if (this.isNextTokenOperator(op)) this.lexer().next();
        else this.throwError(this.getGenericErrorMsg(this.getCurrentTokenValue()));
    }

    skipKeyword(kw) {
        if (this.isNextTokenKeyword(kw)) this.lexer().next();
        else this.throwError(this.getGenericErrorMsg(this.getCurrentTokenValue()));
    }

    getCurrentTokenValue() {
        return this.lexer().peek() ? this.lexer().peek().value : null;
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

        while (this.isNotEndOfFile() && operatorList.indexOf(this.lexer().peek().value) >= 0) {
            node = {
                left : node,
                operation : this.lexer().next().value,
                right : parseOperatorWithLesserPrecedence.bind(this)(),
                value : null
            };
        }

        return node;
    }

    parseNodeLiteral() {
        const token = this.lexer().peek();

        if (nodeLiterals[token.type] != undefined) {
            const nodeliteral = nodeLiterals[token.type];
            if (nodeliteral instanceof BaseNode) return nodeliteral.getNode.call(this);
            else throw new Error(`${token.value} must be of type BaseNode`);
        }

        //check if the token value is a punctuation that can be used in an expression e.g (, [
        if (nodeLiterals[constants.EXP_PUNC][token.value] != undefined) { 
            const nodeliteral = nodeLiterals[constants.EXP_PUNC][token.value];
            if (nodeliteral instanceof BaseNode) return nodeliteral.getNode.call(this);
            else throw new Error(`${token.value} must be of type BaseNode`);
        }

        this.lexer().throwError(this.getGenericErrorMsg(token.value));
    }

    parseBlock(currentBlock) {
        this.pushToBlockTypeStack(currentBlock);
        this.skipPunctuation(constants.SYM.L_PAREN);
        const block = []; 
        while (this.isNotEndOfFile() && this.lexer().peek().value != constants.SYM.R_PAREN) {
            block.push(this.parseAst());
        }
        this.skipPunctuation(constants.SYM.R_PAREN);
        this.popBlockTypeStack();

        return block;
    }

    parseVarname() {
        return  (this.lexer().peek().type == constants.VARIABLE) 
                ? this.lexer().next().value
                : this.lexer().throwError(this.getGenericErrorMsg(this.lexer().peek()));
    }

    parseDelimited(start, stop, separator, parser, predicate) {
        const varList = []; let firstVar = true;

        this.skipPunctuation(start);
        while(this.isNotEndOfFile()) {
            if (this.isNextTokenPunctuation(stop)) break;
            if (firstVar) firstVar = false; else this.skipPunctuation(separator);
            if (this.isNextTokenPunctuation(stop)) break; //this is necessary for an optional last separator
            varList.push(parser(predicate));
        }
        this.skipPunctuation(stop);

        return varList;
    }

    getTokenThatSatisfiesPredicate(predicate) {
        var token = this.lexer().next();
        if (predicate(token)) return token;

        this.throwError(this.getGenericErrorMsg(token.type));
    }

    getGenericErrorMsg(value) {
        return `Cannot process unexpected token : ${value}`;
    }

    parseAst() {
        const token = this.lexer().peek();

        if (kwnodes[token.value] != undefined) {
            const kwNode = kwnodes[token.value];
            if (kwNode instanceof BaseNode) return kwNode.getNode.call(this); //call the method getNode in kwNode object like an extension function to the class Parser
            else throw new Error(`${kwNode} must be of type BaseNode`);
        }

        if (token.type === constants.VARIABLE) { //then a function call is expected
            const callIseNodeLiteral = nodeLiterals[constants.CALL_ISE];
            if (callIseNodeLiteral instanceof BaseNode) return callIseNodeLiteral.getNode.call(this);
            else throw new Error(`${callIseNodeLiteral} must be of type BaseNode`);
        }

        this.throwError(this.getGenericErrorMsg(token.value));
    }

    isNotEndOfFile() {
        return this.lexer().isNotEndOfFile();
    }

    throwError(msg) {
        this.lexer().throwError(`File ${this.yorlangFileName()} - ${msg}`);
    }
}

module.exports = Parser;