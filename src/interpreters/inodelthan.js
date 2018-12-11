const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeLThan extends IBase {
    interpreteNode (node) {
        return this.evaluateNode(node.left) < this.evaluateNode(node.right) ? constants.KW.OOTO : constants.KW.IRO;
    }
}

module.exports = new INodeLThan();
