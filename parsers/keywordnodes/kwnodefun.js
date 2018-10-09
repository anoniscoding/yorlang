const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const kwNodeTi =  require("./kwnodeti.js");

class KwNodeFun extends BaseNode {

    constructor() {
        super()
        if (!(kwNodeTi instanceof BaseNode)) {
            throw new Error("Dependency kwNodeTi must be of type BaseNode");
        } 
    }

    getNode() {
        this.skipKeyword(constants.KW.FUN);
        this.skipPunctuation(constants.SYM.L_BRACKET);

        const init = kwNodeTi.getNode.call(this);

        if (this.isValidFunInitStatement(init)) {
            return this.parseFunNode(init);
        }

        this.lexer.throwError(`Invalid ${constants.KW.FUN} initialization block`);
    }

    isValidFunInitStatement(initNode) {
        //i.e the init statement must be initialized with number and not a string or variable
        return /[0-9]+/i.test(initNode.right.value);
    }

    parseFunNode(init) {
        const node = {
            operation : constants.KW.FUN,
            init : init
        };

        //This is not using parseBracketExpression because 
        //parseBracketExpression expects L_PAREN
        //L_PAREN in fun is optional
        this.setIsArithmeticExpression(false);
        node.condition = this.parseExpression();
        this.setIsArithmeticExpression(true); //set back to default
        
        this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        node.increment = kwNodeTi.getNode.call(this);

        if (this.isInValidFunIncrementStatement(node))
            this.lexer.throwError("Invalid yorlang decrement or increment operation");

        this.skipPunctuation(constants.SYM.R_BRACKET);
        node.body = this.parseBlock(constants.KW.FUN);

        return node;
    }

    isInValidFunIncrementStatement(funNode) {
        const incrementNode = funNode.increment.right;

        if ([constants.SYM.PLUS, constants.SYM.MINUS].indexOf(incrementNode.operation) >= 0) {
            //e.g fun (tí i =0; i < 10; tí i = i + 1;)
            //make sure there is variable 'i' in atleast one child of the incrementNode 
            //i.e ti i = i + 1 or ti i = 1 + i or ti i = i + i
            if ([incrementNode.left.name, incrementNode.right.name].indexOf(funNode.init.left) >= 0) {
                return false;
            }
        }

        return true;
    }
}

module.exports = new KwNodeFun();