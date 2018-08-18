const constants = require("../../constants.js");
const BaseKwNode = require("./basekwnode");

class KwNodePada extends BaseKwNode {

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