const IBase = require("./ibase.js");
const constants = require("../constants.js");
const iNodeGetTi = require("./inodegetti.js");

class INodeSope extends IBase {

    interpreteNode(node) {
        switch(node.body.operation) {
            case constants.ARRAY_ELEM :
                const arrayLiteral = iNodeGetTi.interpreteNode.call(this, node.body);
                console.log(arrayLiteral[node.body.index]); break;
            case constants.GET_TI :
                console.log(iNodeGetTi.interpreteNode.call(this, node.body)); break;
            default : // node is an expression
                console.log(this.evaluateNode(node.body));
        }
    }
}

module.exports = new INodeSope();