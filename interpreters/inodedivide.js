const IBase = require("./ibase.js");

class INodeDivide extends IBase {

    interpreteNode(node) {
        return this.evaluateNode(node.left) / this.evaluateNode(node.right);
    }
}

module.exports = new INodeDivide();