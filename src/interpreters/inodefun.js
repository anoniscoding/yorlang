const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeFun extends IBase {
    interpreteNode (node) {
        this.evaluateNode(node.init);

        while (this.evaluateNode(node.condition) !== constants.KW.IRO) {
            for (let i = 0; i < node.body.length; i++) {
                const returnedValue = this.evaluateNode(node.body[i]);
                if (returnedValue === constants.KW.KURO) return;
                if (returnedValue != undefined) return returnedValue;
            }

            this.evaluateNode(node.increment);
        }
    }
}

module.exports = new INodeFun();
