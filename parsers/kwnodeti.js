const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode");

class KwNodeTi extends BaseKwNode {

    getNode() {
        this.skipKeyword(constants.KW.TI);

        const node =  {
            operation: constants.SYM.ASSIGN,
            left: this.parseVarname()
        };

        this.skipOperator(constants.SYM.ASSIGN);
        node.right  = this.parseExpression();
        this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeTi();