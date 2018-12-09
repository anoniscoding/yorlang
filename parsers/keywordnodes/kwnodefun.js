const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const kwNodeJeki = require("./kwnodejeki.js");
const bracketExpressionNl = require("../nodeLiterals/bracketexpressionnl.js");

class KwNodeFun extends BaseNode {
    constructor () {
        super();
        if (this.isDependenciesInValid()) {
            throw new Error("Dependencies must be of type BaseNode");
        }
    }

    isDependenciesInValid () {
        return !(kwNodeJeki instanceof BaseNode) && !(bracketExpressionNl instanceof BaseNode);
    }

    getNode () {
        this.skipKeyword(constants.KW.FUN);

        this.skipPunctuation(constants.SYM.L_BRACKET);
        const node = {};
        node.operation = constants.KW.FUN;
        node.init = kwNodeJeki.getNode.call(this);
        node.condition = bracketExpressionNl.getNode.call(this, false, false);

        this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
        node.increment = kwNodeJeki.getNode.call(this);

        if (KwNodeFun.isInValidFunIncrementStatement(node)) {
            this.throwError("Invalid yorlang decrement or increment operation");
        }
        this.skipPunctuation(constants.SYM.R_BRACKET);

        node.body = this.parseBlock(constants.KW.FUN);

        return node;
    }

    static isInValidFunIncrementStatement (funNode) {
        const incrementNode = funNode.increment.right;

        if ([constants.SYM.PLUS, constants.SYM.MINUS, ].indexOf(incrementNode.operation) >= 0) {
            // e.g fun (tí i =0; i < 10; tí i = i + 1;)
            // make sure there is variable 'i' in atleast one child of the incrementNode
            // i.e jeki i = i + 1 or jeki i = 1 + i or jeki i = i + i
            if ([incrementNode.left.name, incrementNode.right.name, ].indexOf(funNode.init.left) >= 0) {
                return false;
            }
        }

        return true;
    }
}

module.exports = new KwNodeFun();
