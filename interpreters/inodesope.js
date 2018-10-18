const IBase = require("./ibase.js");
const constants = require("../constants.js");
const iNodeGetTi = require("./inodegetti.js");

class INodeSope extends IBase {

    interpreteNode(node) {
        switch(node.body.operation) {
            case constants.ARRAY_ELEM :
                const arrayLiteral = iNodeGetTi.interpreteNode.call(this, node.body);
                this.environment().sope(arrayLiteral[node.body.index]); break;
            case constants.GET_TI :
                this.environment().sope(iNodeGetTi.interpreteNode.call(this, node.body)); break;
            default : // node is an expression
                this.environment().sope(this.evaluateNode(node.body));
        }
    }
}

module.exports = new INodeSope();