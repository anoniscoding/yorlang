const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeTi extends IBase {

    interpreteNode(node) {
        if (node.left.operation === constants.ARRAY_ELEM) {
            INodeTi.setArrayElementValue(this, node);
        }

        this.environment().setTi(this.getCurrentScope(), node.left, this.evaluateNode(node.right));
    }

    static setArrayElementValue(context, node) {
        const tiNode = { name: node.left.name, operation: constants.GET_TI };
        const arrayLiteral = context.evaluateNode(tiNode);
        const [array, index] = INodeTi.getArrayWithIndexTuple(context, node, arrayLiteral);

        if (array instanceof Array) array[index] = context.evaluateNode(node.right);
        else context.throwError(`Cannot set invalid array element for array : ${tiNode.name}`);
    }

    static getArrayWithIndexTuple(context, node, arrayLiteral) {
        let tuple;

        for (let i = 0; i < node.left.indexNodes.length; i++) {
            const arrayIndex = context.evaluateNode(node.left.indexNodes[i]);

            if (typeof arrayIndex == "number") {
                if (i == 0) {
                    tuple = INodeTi.getTuple(arrayLiteral, arrayIndex) || arrayLiteral[arrayIndex];
                } else {
                    tuple = INodeTi.getTuple(tuple, arrayIndex) || tuple[arrayIndex];
                }
            } else {
                context.throwError(`Typeof index given for array ${node.name} must be a number`);
            }
        };

        return tuple;
    }

    static getTuple(arrayLiteral, index) {
        if (!(arrayLiteral[index] instanceof Array)) {
            return [arrayLiteral, index];
        }
    }
}

module.exports = new INodeTi(); 