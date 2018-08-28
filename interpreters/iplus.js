const IBase = require("./ibase.js");

class IPlus extends IBase {

    interpreteNode(node) {
        return this.evaluateNode(node.left) + this.evaluateNode(node.right);
    }
}