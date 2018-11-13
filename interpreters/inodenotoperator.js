const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeNotOperator extends IBase {

    interpreteNode(node) {
        if (this.evaluateNode(node.body) === constants.KW.IRO) return constants.KW.OOTO;
                
        return constants.KW.IRO;
    }
}

module.exports = new INodeNotOperator();