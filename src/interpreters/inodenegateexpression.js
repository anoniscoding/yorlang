const IBase = require("./ibase.js");

class INodeNegateExpression extends IBase {
    interpreteNode (node) {
        const expressionValue = this.evaluateNode(node.body);
        if (typeof expressionValue === "number") return -parseFloat(expressionValue);

        this.throwError("Cannot apply negation operator to the given expression");
    }
}

module.exports = new INodeNegateExpression();
