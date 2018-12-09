const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeSe extends IBase {

    interpreteNode(node) {
        if (this.evaluateNode(node.condition) !== constants.KW.IRO) {
            return INodeSe.runBody(this, node.then);
        } else if (node.else != undefined) {
            return INodeSe.runBody(this, node.else);
        }
    }

    static runBody(context, body) {
        //It is expected to be a 'tabi se' block when body is not an instance of an array
        if (!(body instanceof Array)) context.evaluateNode(body);

        for (let i = 0; i < body.length; i++) {
            const returnedValue = context.evaluateNode(body[i]);
            if (returnedValue != undefined) return returnedValue; //it's an ise pada value or kuro statement
        }
    }
}

module.exports = new INodeSe();