const IBase = require("./ibase.js");
const contansts = require("../constants.js");
const feedbackMessages = require("../feedbackMessages.js");

class INodeArrayElement extends IBase {
    interpreteNode (node) {
        const jekiNode = { name: node.name, operation: contansts.GET_JEKI, };
        const arrayLiteral = this.evaluateNode(jekiNode);

        return INodeArrayElement.getArrayElement(this, node, arrayLiteral);
    }

    static getArrayElement (context, node, arrayLiteral) {
        let arrayElement; let isOnedimensionalArray = true;

        node.indexNodes.map(indexNode => { // if this callback run more than once, then the array is multi-dimensional
            const index = context.evaluateNode(indexNode);

            if (typeof index === "number") {
                arrayElement = (isOnedimensionalArray) ? arrayLiteral[index] : arrayElement[index];
                isOnedimensionalArray = false;
            } else {
                context.throwError(feedbackMessages.invalidArrayIndexTypeMsg(node.name));
            }
        });

        if (arrayElement === undefined) context.throwError(feedbackMessages.arrayIndexDoesNotExistMsg(node.name));

        return arrayElement;
    }
}

module.exports = new INodeArrayElement();
