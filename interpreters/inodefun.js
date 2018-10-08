const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeFun extends IBase {

    interpreteNode(node) {
        let isBreakFunLoop = false;
        this.evaluateNode(node.init);

        while (this.evaluateNode(node.condition) !== constants.KW.IRO) {
            for (let i = 0; i < node.body.length; i++) {
                if (this.evaluateNode(node.body[i]) === constants.KW.KURO) {
                    isBreakFunLoop = true;
                    break;
                }
            }

            if (isBreakFunLoop) break;
            this.evaluateNode(node.increment);
        }
    }
}

module.exports = new INodeFun();