const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeNotOperator extends IBase {

    interpreteNode(node) {
        if (this.evaluateNode(node.body) === constants.KW.IRO) return constants.KW.OOTO;
        
        //There's no need for another case because bodyValue will always have a value
        return constants.KW.IRO;
    }
}

module.exports = new INodeNotOperator();