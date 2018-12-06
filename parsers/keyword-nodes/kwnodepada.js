const constants = require("../../constants.js");
const BaseNode = require("../baseNode.js");

class KwNodePada extends BaseNode {

    getNode() {        
        if (KwNodePada.isExpectedPadaStatement(this)) {
            return KwNodePada.getParsedPadaNode(this);
        }
        
        this.throwError("Yorlang pada keyword not expected in a non function(ise) block");
    }

    static isExpectedPadaStatement(context) {
        return context.getBlockTypeStack().indexOf(constants.KW.ISE) >= 0
    }

    static getParsedPadaNode(context) {
        context.skipKeyword(constants.KW.PADA);
        const node = {};
        node.operation = constants.KW.PADA;
        node.body = context.parseExpression();
        context.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodePada();