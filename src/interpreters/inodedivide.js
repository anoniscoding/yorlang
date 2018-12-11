const IBase = require("./ibase.js");

class INodeDivide extends IBase {
    interpreteNode (node) {
        const leftNodeValue = this.evaluateNode(node.left);
        const rightNodeValue = this.evaluateNode(node.right);
        if (rightNodeValue === 0) this.throwError("YorlangArithmeticException - cannot divide by zero");

        return leftNodeValue / rightNodeValue;
    }
}

module.exports = new INodeDivide();
