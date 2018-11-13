const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeSe extends IBase {

    interpreteNode(node) {
        if (this.evaluateNode(node.condition) === constants.KW.OOTO) {
            return INodeSe.runBody(this, node.then);
        } else if (node.else != undefined) {
            return INodeSe.runBody(this, node.else);
        }
    }

    static runBody(context, body) {
        //cater for 'tabi se' block
        if (!(body instanceof Array)) context.evaluateNode(body);

        for (let i = 0; i < body.length; i++) {
            const returnedValue = context.evaluateNode(body[i]);

            if (returnedValue === constants.KW.KURO) return constants.KW.KURO;
            else if (returnedValue != undefined) return returnedValue; //it's an ise pada value
        }
    }
}

module.exports = new INodeSe();