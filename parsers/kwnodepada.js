const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode");

class KwNodePada extends BaseKwNode {

    getNode() {
        this.parser.skipKeyword(constants.KW.PADA);
        const node = {
            operation: constants.KW.PADA,
            body: this.parser.parseExpression()
        };
        this.parser.skipPunctuation(constants.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodePada();