const IBase = require("./ibase.js");

class INodeMultiply extends IBase {

    interpreteNode(node) {
        return this.evaluateNode(node.left) * this.evaluateNode(node.right);
    }
}

module.exports = new INodeMultiply();