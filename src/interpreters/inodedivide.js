const IBase = require("./ibase.js");
const feedbackMessages = require("../feedbackMessages.js");

class INodeDivide extends IBase {
    interpreteNode (node) {
        const leftNodeValue = this.evaluateNode(node.left);
        const rightNodeValue = this.evaluateNode(node.right);
        if (rightNodeValue === 0) this.throwError(feedbackMessages.yorlangArithmeticException());

        return leftNodeValue / rightNodeValue;
    }
}

module.exports = new INodeDivide();
