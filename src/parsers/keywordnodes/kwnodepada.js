const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodePada extends BaseNode {
    getNode () {
        if (KwNodePada.isExpectedPadaStatement(this)) {
            return KwNodePada.getParsedPadaNode(this);
        }

        this.throwError(feedbackMessages.unexpectedDeclaration(constants.KW.PADA));
    }

    static isExpectedPadaStatement (context) {
        return context.getBlockTypeStack().includes(constants.KW.ISE);
    }

    static getParsedPadaNode (context) {
        context.skipKeyword(constants.KW.PADA);
        const node = {};
        node.operation = constants.KW.PADA;
        node.body = context.parseExpression();
        context.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodePada();
