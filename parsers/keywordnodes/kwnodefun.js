const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const kwNodeTi =  require("./kwnodeti.js");

class KwNodeFun extends BaseNode {

    constructor() {
        super();
        if (!(kwNodeTi instanceof BaseNode)) {
            throw new Error("Dependency kwNodeTi must be of type BaseNode");
        } 
    }

    getNode() {
        this.skipKeyword(constants.KW.FUN);
        this.skipPunctuation(constants.SYM.L_BRACKET);

        const init = kwNodeTi.getNode.call(this);

        return KwNodeFun.parseFunNode(this, init);
    }

    static parseFunNode(context, init) {
        const node = {};
        node.operation = constants.KW.FUN;
        node.init = init;

        //This is not using bracketExpressionNl because bracketExpressionNl expects L_BRACKET
        //L_BRACKET in fun condition is optional
        context.setIsArithmeticExpression(false);
        node.condition = context.parseExpression();
        context.setIsArithmeticExpression(true); //set back to default
        
        context.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        node.increment = kwNodeTi.getNode.call(context);

        if (KwNodeFun.isInValidFunIncrementStatement(node))
            context.lexer.throwError("Invalid yorlang decrement or increment operation");

        context.skipPunctuation(constants.SYM.R_BRACKET);
        node.body = context.parseBlock(constants.KW.FUN);

        return node;
    }

    static isInValidFunIncrementStatement(funNode) {
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