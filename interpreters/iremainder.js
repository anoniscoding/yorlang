const IBase = require("./ibase.js");

class IRemainder extends IBase {

    interpreteNode(node) {
        return this.evaluateNode(node.left) % this.evaluateNode(node.right);
    }
}

module.exports = new IRemainder();