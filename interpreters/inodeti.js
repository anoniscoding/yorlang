const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeTi extends IBase {

    interpreteNode(node) {
        if (node.left.operation === constants.ARRAY_ELEM) {
            const tiNode = { name: node.left.name, operation: constants.GET_TI };
            const arrayLiteral = this.evaluateNode(tiNode);
            arrayLiteral[node.left.index] = this.evaluateNode(node.right);
            return;
        }
        
        this.environment().setTi(this.getCurrentScope(), node.left, this.evaluateNode(node.right));
    }
}

module.exports = new INodeTi();