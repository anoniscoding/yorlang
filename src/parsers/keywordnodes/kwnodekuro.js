const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeKuro extends BaseNode {
    getNode () {
        if (KwNodeKuro.isExpectedKuroStatement(this)) {
            return KwNodeKuro.getParsedKuroNode(this);
        }

        this.throwError(feedbackMessages.unexpectedDeclaration(constants.KW.KURO));
    }

    static isExpectedKuroStatement (context) {
        return context.getBlockTypeStack().includes(constants.KW.FUN) ||
                                            context.getBlockTypeStack().includes(constants.KW.NIGBATI);
    }

    static getParsedKuroNode (context) {
        const node = {};
        node.operation = context.lexer().next().value;
        context.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeKuro();
