const IBase = require("./ibase.js");
const contansts = require("../constants.js");

class INodeArrayElement extends IBase {

    interpreteNode(node) {
        const jekiNode = {name: node.name, operation: contansts.GET_TI}
        const arrayLiteral = this.evaluateNode(jekiNode);
        
        return INodeArrayElement.getArrayElement(this, node, arrayLiteral);
    }

    static getArrayElement(context, node, arrayLiteral) {
        let arrayElement, isOnedimensionalArray = true;

        node.indexNodes.map(indexNode => { //if this callback run more than once, then the array is multi-dimensional
            const index = context.evaluateNode(indexNode);

            if (typeof index == "number") {
                arrayElement = (isOnedimensionalArray) ? arrayLiteral[index] : arrayElement[index];
                isOnedimensionalArray = false;
            } else {
                context.throwError(`Typeof index given for array ${node.name} must be a number`);
            }
        });

        if (arrayElement == undefined) context.throwError(`Index given for array ${node.name} does not exist`);

        return arrayElement;
    }
}

module.exports = new INodeArrayElement();