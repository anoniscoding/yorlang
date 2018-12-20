const IBase = require("./ibase.js");
const feedbackMessages = require("../feedbackMessages.js");

class INodeNegateExpression extends IBase {
    interpreteNode (node) {
        const expressionValue = this.evaluateNode(node.body);
        if (typeof expressionValue === "number") return -parseFloat(expressionValue);

        this.throwError(feedbackMessages.cannotNegateMsg(expressionValue));
    }
}

module.exports = new INodeNegateExpression();
