const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeFun extends IBase {

    interpreteNode(node) {
        this.evaluateNode(node.init);

        while (this.evaluateNode(node.condition) !== constants.KW.IRO) {
            if (INodeFun.hasFinishedRunningFunBody(this, node.body)) break;
            this.evaluateNode(node.increment);
        }
    }

    static hasFinishedRunningFunBody(context, funBody) {
        for (let i = 0; i < funBody.length; i++) {
            if (context.evaluateNode(funBody[i]) === constants.KW.KURO) {
                return true;
            }
        }

        return false;
    }
}

module.exports = new INodeFun();