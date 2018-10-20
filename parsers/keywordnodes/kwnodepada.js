const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodePada extends BaseNode {

    getNode() {        
        if (KwNodePada.isExpectedPadaStatement(this)) {
            this.skipKeyword(constants.KW.PADA);
            const node = {
                operation: constants.KW.PADA,
                body: this.parseExpression()
            };
            this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
    
            return node;
        }
        
        throw new Error("Yorlang pada keyword not expected in a non function block");
    }

    static isExpectedPadaStatement(context) {
        return context.getBlockTypeStack().indexOf(constants.KW.ISE) >= 0
    }
}

module.exports = new KwNodePada();