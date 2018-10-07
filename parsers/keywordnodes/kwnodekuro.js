const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodeKuro extends BaseNode {

    getNode() {
        const isExpectedKuroStatement = this.blockTypeStack.indexOf(constants.KW.FUN) >= 0 ||
            this.blockTypeStack.indexOf(constants.KW.YI) >= 0 ||
            this.blockTypeStack.indexOf(constants.KW.NIGBATI) >= 0

        if (isExpectedKuroStatement) {
            const node = {
                operation: this.lexer.next().value,
            };
            this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
            
            return node;
        }

        throw new Error("Yorlang Kuro keyword not expected");
    }
}

module.exports = new KwNodeKuro();