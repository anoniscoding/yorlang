const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeNigbati extends IBase {

    interpreteNode(node) {
        while (this.evaluateNode(node.condition) !== constants.KW.IRO) {
            if (INodeNigbati.hasFinisihedRunningNigbatiBody(this, node.body)) break;
        }
    }

    static hasFinisihedRunningNigbatiBody(context, nigbatiBody) {
        for (let i = 0; i < nigbatiBody.length; i++) {
            if (context.evaluateNode(nigbatiBody[i]) === constants.KW.KURO) {
                return true;
            }
        }

        return false;
    }
}

module.exports = new INodeNigbati();