const constants = require("../constants.js");
const kwnodes = require("./keywordnodes/kwnodes.js");
const nodeLiterals = require("./nodeLiterals/nodeliterals.js");
const helpers = require("./parser_helper_function.js");
const BaseKwNode = require("./keywordnodes/basekwnode.js");

class Parser {

    constructor(lexer) {
        this.lexer = lexer;
        this.isArithmeticExpression = true;
        this.currentBlockType = [];
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

        if (this.isArithmeticExpression) return this.parseWhile(operatorList, this.parsePlusMinus);
        else return this.parseWhile(operatorList, this.parseNodeLiteral); //it is a boolean expression
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

        if (nodeLiterals[token.type] != undefined) {
            return nodeLiterals[token.type].getNodeLiteral.call(this);
        }

        //find the name of the property of the current token value
        const constantsPropertyList = Object.keys(constants.SYM);
        const constantsPropertyValuesList = Object.values(constants.SYM);
        const index = constantsPropertyValuesList.indexOf(token.value);
        const property_name = constantsPropertyList[index];

        //check if property_name is a punctuation that can be used in an expression e.g (, [
        if (nodeLiterals[constants.EXP_PUNC][property_name] != undefined) {  
            return nodeLiterals[constants.EXP_PUNC][property_name].getNodeLiteral.call(this);
        }

        this.lexer.throwError(this.getGenericErrorMsg(token.type));
    }

    isNumStringVariable(token) {
        return token.type == constants.NUMBER || token.type == constants.STRING || token.type == constants.VARIABLE;
    }

    parseLeaf() {
        return {
            value: this.lexer.next().value,
            left: null,
            right: null,
            operation: null
        };
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

        if ((kwnodes[token.value] != undefined)) {
            const kwNode = kwnodes[token.value];
            if (kwNode instanceof BaseKwNode) return kwNode.getNode.call(this); //call the method getNode in kwNode object like an extension function to the class Parser
            else throw new Error(`${token.value} must be a subclass of BaseKwNode`);
        }

        if (token.type == constants.VARIABLE) {
            const node = nodeLiterals[constants.VARIABLE].getNodeLiteral.call(this);
            this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
            return node;
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

const helpersNameList = Object.keys(helpers);
helpersNameList.forEach((helperName,index,array) => {
    Parser.prototype[helperName] = helpers[helperName];
});

module.exports = Parser;