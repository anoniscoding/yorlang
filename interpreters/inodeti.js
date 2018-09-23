const IBase = require("./ibase.js");
const iNodeGetTi = require("./inodegetti.js");
const constants = require("../constants.js");

class INodeTi extends IBase {

    interpreteNode(node) {
        if (node.left.operation == constants.ARRAY_ELEM) {
            let arrayLiteral = iNodeGetTi.interpreteNode.call(this, node.left);
            arrayLiteral[node.left.index] = this.evaluateNode(node.right);
            return;
        }
        
        this.environment().setTi(this.getCurrentScope(), node.left, this.evaluateNode(node.right));
    }
}

module.exports = new INodeTi();