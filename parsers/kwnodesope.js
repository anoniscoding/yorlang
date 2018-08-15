const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode");

class KwNodeSope extends BaseKwNode {

    getNode() {
        this.parser.skipKeyword(constants.KW.SOPE);
        const node = {
            operation: constants.KW.SOPE,
            body: this.parser.parseNodeLiteral()
        }
        this.parser.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeSope();