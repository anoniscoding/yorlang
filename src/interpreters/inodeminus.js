const IBase = require("./ibase.js");

class INodeMinus extends IBase {
    interpreteNode (node) {
        return this.evaluateNode(node.left) - this.evaluateNode(node.right);
    }
}

module.exports = new INodeMinus();
