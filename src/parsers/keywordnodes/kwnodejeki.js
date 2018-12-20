const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const variableNl = require("../nodeLiterals/variablenl.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeJeki extends BaseNode {
    getNode () {
        this.skipKeyword(constants.KW.JEKI);

        const node = {};
        node.operation = constants.SYM.ASSIGN;
        const varNode = variableNl.getNode.call(this);
        if (varNode.operation === constants.CALL_ISE) this.throwError(feedbackMessages.invalidAssignment());
        node.left = (varNode.operation === constants.GET_JEKI) ? varNode.name : varNode;
        this.skipOperator(constants.SYM.ASSIGN);
        node.right = this.parseExpression();
        this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeJeki();
