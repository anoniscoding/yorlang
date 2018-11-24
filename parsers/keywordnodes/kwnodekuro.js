const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodeKuro extends BaseNode {

    getNode() {
        if (KwNodeKuro.isExpectedKuroStatement(this)) {
            return KwNodeKuro.getParsedKuroNode(this);
        }

        this.throwError("Yorlang Kuro keyword not expected");
    }

    static isExpectedKuroStatement(context) {
        return context.getBlockTypeStack().indexOf(constants.KW.FUN) >= 0 ||
                                            context.getBlockTypeStack().indexOf(constants.KW.NIGBATI) >= 0;
    }

    static getParsedKuroNode(context) {
        const node = {};
        node.operation = context.lexer.next().value;
        context.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeKuro();