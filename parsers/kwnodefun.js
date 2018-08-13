const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode");
const kwNodeTi =  require("./kwnodeti.js");

class KwNodeFun extends BaseKwNode {

    getNode() {
        this.parser.skipKeyword(constants.KW.FUN);
        this.parser.skipPunctuation(constants.SYM.L_BRACKET);

        const init = kwNodeTi.setParser(this.parser).getNode();

        if (this.isValidFunInitStatement(init)) {
            return this.parseNode(init);
        }

        this.parser.tokenInput.throwError(`Invalid ${constants.KW.FUN} initialization block`);
    }

    isValidFunInitStatement(initNode) {
        return /[0-9]+/i.test(initNode.right.value);
    }

    parseNode(init) {
        const node = {
            operation : constants.KW.FUN,
            init : init
        };

        this.parser.isArithmeticExpression = false;
        node.condition = this.parser.parseExpression();
        this.parser.isArithmeticExpression = true; //set back to default
        
        this.parser.skipPunctuation(constants.STATEMENT_TERMINATOR);

        node.increment = kwNodeTi.setParser(this.parser).getNode();

        if (this.isInValidFunIncrementStatement(node))
            this.parser.tokenInput.throwError("Invalid yorlang decrement or increment operation");

        this.parser.skipPunctuation(constants.SYM.R_BRACKET);
        node.body = this.parser.parseBlock(constants.KW.FUN);

        return node;
    }

    isInValidFunIncrementStatement(funNode) {
        const incrementNode = funNode.increment.right;

        if ([constants.SYM.PLUS, constants.SYM.MINUS].indexOf(incrementNode.operation) >= 0) {
            //e.g fun (tí i =0; i < 10; tí i = i + 1;)
            //make sure there is variable 'i' in atleast one child of the incrementNode 
            //i.e ti i = i + 1 or ti i = 1 + i or ti i = i + i
            if ([incrementNode.left.name, incrementNode.right.name].indexOf(funNode.init.left.name) >= 0) {
                return false;
            }
        }

        return true;
    }
}

module.exports = new KwNodeFun();