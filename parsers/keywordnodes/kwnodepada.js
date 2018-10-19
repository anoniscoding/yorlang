const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodePada extends BaseNode {

    getNode() {
        const isExpectedPadaStatement = this.getBlockTypeStack().indexOf(constants.KW.ISE) >= 0;
        
        if (isExpectedPadaStatement) {
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
}

module.exports = new KwNodePada();