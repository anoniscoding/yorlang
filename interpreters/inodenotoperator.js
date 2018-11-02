const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeNotOperator extends IBase {

    interpreteNode(node) {
        const bodyValue = this.evaluateNode(node.body);
        if (bodyValue === constants.KW.OOTO) return constants.KW.IRO;
        if (bodyValue === constants.KW.IRO) return constants.KW.OOTO;
        
        //There's no need for another case because bodyValue will always have a value
        return constants.KW.IRO;
    }
}

module.exports = new INodeNotOperator();