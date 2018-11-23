const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeTi extends IBase {

    interpreteNode(node) {
        if (node.left.operation === constants.ARRAY_ELEM) {
            INodeTi.setArrayElemValue(this, node);
        }
        
        this.environment().setTi(this.getCurrentScope(), node.left, this.evaluateNode(node.right));
    }

    static setArrayElemValue(context, node) {
        const tiNode = { name: node.left.name, operation: constants.GET_TI };
        const arrayLiteral = context.evaluateNode(tiNode);

        const index = context.evaluateNode(node.left.index);
        if (typeof index == "number") {
            arrayLiteral[index] = context.evaluateNode(node.right);
        }
    }
}

module.exports = new INodeTi();