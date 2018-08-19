const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodeSope extends BaseNode {

    getNode() {
        this.skipKeyword(constants.KW.SOPE);
        const node = {
            operation: constants.KW.SOPE,
            body: this.parseNodeLiteral()
        }
        this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeSope();