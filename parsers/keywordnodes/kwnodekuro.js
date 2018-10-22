const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodeKuro extends BaseNode {

    getNode() {
        if (KwNodeKuro.isExpectedKuroStatement(this)) {
            const node = {};
            node.operation = this.lexer.next().value;
            this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
            
            return node;
        }

        this.lexer.throwError("Yorlang Kuro keyword not expected");
    }

    static isExpectedKuroStatement(context) {
        return context.getBlockTypeStack().indexOf(constants.KW.FUN) >= 0 ||
                                            context.getBlockTypeStack().indexOf(constants.KW.NIGBATI) >= 0;
    }
}

module.exports = new KwNodeKuro();