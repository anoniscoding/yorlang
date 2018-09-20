const IBase = require("./ibase.js");

class IDivide extends IBase {

    interpreteNode(node) {
        return this.evaluateNode(node.left) / this.evaluateNode(node.right);
    }
}

module.exports = new IDivide();