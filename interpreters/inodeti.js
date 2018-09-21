const IBase = require("./ibase.js");

class INodeTi extends IBase {

    interpreteNode(node) {
        this.environment().setTi(this.getCurrentScope(), node.left, this.evaluateNode(node.right));
    }
}

module.exports = new INodeTi();