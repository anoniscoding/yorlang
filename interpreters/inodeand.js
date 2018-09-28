const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeAnd extends IBase {

    interpreteNode(node) {
        return this.evaluateNode(node.left) !== constants.KW.IRO && this.evaluateNode(node.right) !== constants.KW.IRO
                    ? constants.KW.OOTO : constants.KW.IRO;
    }
}

module.exports = new INodeAnd();