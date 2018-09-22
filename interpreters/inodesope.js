const IBase = require("./ibase.js");
const constants = require("../constants.js");
const iNodeGetTi = require("./inodegetti.js");

class INodeSope extends IBase {

    interpreteNode(node) {
        if (node.body.operation === null)
            console.log(node.body.value)
        else if (node.body.operation === constants.GET_TI )
            console.log(iNodeGetTi.interpreteNode.call(this, node.body));    
    }
}

module.exports = new INodeSope();