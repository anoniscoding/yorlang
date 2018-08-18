const constants = require("../../constants.js");
const BaseKwNode = require("./basekwnode");

class KwNodeTi extends BaseKwNode {

    getNode() {
        this.skipKeyword(constants.KW.TI);

        const node =  {
            operation: constants.SYM.ASSIGN,
        };

        node.left = this.parseVarname();

        //if current variable is an array element
        if (this.lexer.peek().value === constants.SYM.L_SQ_BRACKET) {
            node.left = arrayNl.getNodeLiteral.call(this, node.name);
        }

        this.skipOperator(constants.SYM.ASSIGN);
        node.right  = this.parseExpression();
        this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeTi();