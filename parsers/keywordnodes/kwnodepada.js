const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodePada extends BaseNode {

    getNode() {
        this.skipKeyword(constants.KW.PADA);
        const node = {
            operation: constants.KW.PADA,
            body: this.parseExpression()
        };
        this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodePada();