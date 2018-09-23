const IBase = require("./ibase.js");
const constants = require("../constants.js");
const iNodeGetTi = require("./inodegetti.js");

class INodeSope extends IBase {

    interpreteNode(node) {
        switch(node.body.operation) {
            case constants.ARRAY_ELEM :
                let arrayLiteral = iNodeGetTi.interpreteNode.call(this, node.body);
                console.log(arrayLiteral[node.body.index]); break;
            case constants.GET_TI :
                console.log(iNodeGetTi.interpreteNode.call(this, node.body));
            default : // node is a string/num/float
                console.log(node.body.value);
        }
    }
}

module.exports = new INodeSope();