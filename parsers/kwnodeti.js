const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode");

class KwNodeTi extends BaseKwNode {

    getNode() {
        this.parser.skipKeyword(constants.KW.TI);

        const node =  {
            operation: constants.SYM.ASSIGN,
            left: this.parser.parseVarname()
        };

        this.parser.skipOperator(constants.SYM.ASSIGN);
        node.right  = this.parser.parseExpression();
        this.parser.skipPunctuation(constants.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeTi();