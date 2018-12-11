const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeNotOperator extends IBase {
    interpreteNode (node) {
        return (this.evaluateNode(node.body) === constants.KW.IRO) ? constants.KW.OOTO : constants.KW.IRO;
    }
}

module.exports = new INodeNotOperator();
