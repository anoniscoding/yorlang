const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeNigbati extends IBase {

    interpreteNode(node) {
        let isBreakNigbatiLoop = false;

        while (this.evaluateNode(node.condition) !== constants.KW.IRO) {
            for (let i = 0; i < node.body.length; i++) {
                if (this.evaluateNode(node.body[i]) === constants.KW.KURO) {
                    isBreakNigbatiLoop = true;
                    break;
                }
            }

            if (isBreakNigbatiLoop) break;
        }
    }
}

module.exports = new INodeNigbati();