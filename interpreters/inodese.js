const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeSe extends IBase {

    interpreteNode(node) {
        if (this.evaluateNode(node.condition) === constants.KW.OOTO) {
            return INodeSe.runSeBody(this, node.then);
        } else {
            if (node.else != undefined) {
                return INodeSe.runSeBody(this, node.else);
            }
        }
    }

    static runSeBody(context, seBody) {
        for (let i = 0; i < seBody.length; i++) {
            const returnedValue = context.evaluateNode(seBody[i]);

            if (returnedValue === constants.KW.KURO) return constants.KW.KURO;
            else if (returnedValue != undefined) return returnedValue; //it's an ise return (or pada) value
        }
    }
}

module.exports = new INodeSe();