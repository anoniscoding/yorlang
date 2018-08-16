const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode");

class KwNodeSope extends BaseKwNode {

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