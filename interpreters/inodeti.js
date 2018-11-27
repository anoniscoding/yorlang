const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeTi extends IBase {

    interpreteNode(node) {
        if (node.left.operation === constants.ARRAY_ELEM) {
            INodeTi.setArrayElement(this, node);
        }

        this.environment().setTi(this.getCurrentScope(), node.left, this.evaluateNode(node.right));
    }

    static setArrayElement(context, node) { //this also caters for setting multi-dimensional array element
        let arrayLiteral = INodeTi.getArrayLiteral(context, node);

        for (let i = 0; i < node.left.indexNodes.length; i++) {
            const arrayIndex = context.evaluateNode(node.left.indexNodes[i]);

            if (typeof arrayIndex == "number") {
                if (!(arrayLiteral[arrayIndex] instanceof Array) && (i < node.left.indexNodes.length - 1)) {
                    context.throwError(`Cannot set invalid array element for array : ${node.left.name}`);
                }

                if ((arrayLiteral[arrayIndex] instanceof Array) && (i < node.left.indexNodes.length - 1)) {
                    arrayLiteral = arrayLiteral[arrayIndex];
                }

                if (i == node.left.indexNodes.length - 1) {
                    arrayLiteral[arrayIndex] = context.evaluateNode(node.right);
                }
            } else {
                context.throwError(`Typeof index given for array ${node.name} must be a number`);
            }
        };
    }

    static getArrayLiteral(context, node) {
        const tiNode = { name: node.left.name, operation: constants.GET_TI };
        return context.evaluateNode(tiNode);
    }
}

module.exports = new INodeTi(); 